import React, { useState, useEffect, useCallback } from 'react';
import ImageMapper from 'react-image-mapper';
import { Button, Modal } from 'react-bootstrap';
import Const from './../../util/Costanti';
import { toast } from 'react-toastify';
import TrackingGA from './../utils/Tracking';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ImageMapperPixels = React.memo(({ enableSpinner, disableSpinner, canvas }) => {
  const { t } = useTranslation();

  const [hoveredArea, setHoveredArea] = useState(null);
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const redirectUrl = useCallback((url) => {
    if (url) {
      enableSpinner();
      axios.post(Const.SAVE_CLICK, { 'url': url })
        .then(result => {
          disableSpinner();
          window.location.href = (url.indexOf('http') === -1 ? 'http://' + url : url);
        })
        .catch(err => {
          disableSpinner();
          window.location.href = (url.indexOf('http') === -1 ? 'http://' + url : url);
        })
    }
  }, [url])

  const callRedirect = useCallback(() => {
    TrackingGA.event("Visitor", "Click pubblicita'", "utente non loggato ha cliccato su una pubblicita'")
    handleClose();
    redirectUrl(url);
  }, [url, redirectUrl])

  const verifyUser = (url) => {
    if (!url) {
      return;
    }
    axios.get(Const.CHECK_TOKEN)
      .then(result => {
        if (result.data.code === 200) {
          TrackingGA.event("User", "Click pubblicita'", "utente loggato ha cliccato su una pubblicita'")
          redirectUrl(url);
        } else {
          setUrl(url);
          handleShow(true);
        }
      })
      .catch(err => {
        toast.error(err.message != null ? err.message : "ERRORE", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      })
  }

  const clicked = (area, e) => {
    if (Const.isMobileBrowser(navigator.userAgent)) {
      if (area.url) {
        setHoveredArea(null)
        verifyUser(area.url);
      } else {
        enterArea(area, e);
      }
    } else {
      if (hoveredArea) {
        setHoveredArea(null)
        verifyUser(area.url);
      }
    }
  }

  const enterArea = (area, e) => {
    setHoveredArea({
      ...area,
      x: e.clientX,
      y: e.clientY,
    });
  }

  const leaveArea = (area) => {
    setHoveredArea(null);
  }

  const getTipPosition = (area) => {
    let posX = Math.abs(window.innerWidth - area.x) <= 20 ? area.x - 30 : area.x;
    posX = Math.abs(posX - 0) <= 20 ? posX + 30 : posX;
    
    return { top: `${area.y}px`, left: `${posX}px` };
  }

  useEffect(() => {
    disableSpinner();
  }, [])

  return (
    <>
      <ImageMapper
        src={canvas.dataURL}
        map={canvas.refer}
        onMouseEnter={(area, _, e) => enterArea(area, e)}
        onMouseLeave={area => leaveArea(area)}
        onClick={(area, _, e) => clicked(area, e)}
      />
      {
        hoveredArea &&
        <span
          className="tooltip-map"
          style={{ ...getTipPosition(hoveredArea) }}
        >
          {hoveredArea && hoveredArea.name === "Vai al sito" ? t('home.tooltipText') : hoveredArea.name }
        </span>

      }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('home.modalTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('home.modalBody1') + '\n' + t('home.modalBody2')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('home.modalButtonClose')}
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
            onClick={callRedirect}>
            {t('home.modalButtonContinue')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
})

export default ImageMapperPixels;
