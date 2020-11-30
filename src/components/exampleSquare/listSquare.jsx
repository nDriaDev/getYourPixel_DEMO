import React, {useEffect} from 'react';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const Cols1 = ({index, style}) => {
  return(
    <div className="display-col-list mx-auto" style={style}>
      <div className="square my-tooltip">
        <span className="tooltiptext right">
          {'(' + index + ',1)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext right">
          {'(' + index + ',2)'}
        </span>
      </div>
    </div>
  )
}

const Cols = ({index, style}) => {
  return(
    <div className="span-cols-square mx-auto" style={style}>
      <div className="square my-tooltip">
        <span className="tooltiptext right">
          {'(' + (index+1) + ',1)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext right">
          {'(' + (index+1) + ',2)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext right">
          {'(' + (index+1) + ',3)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext right">
          {'(' + (index+1) + ',4)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',5)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',6)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',7)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',8)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',9)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',10)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',11)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',12)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',13)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',14)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',15)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',16)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',17)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',18)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',19)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',20)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',21)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',22)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',23)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',24)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',25)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',26)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',27)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',28)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',29)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',30)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',31)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',32)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',33)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',34)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',35)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',36)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',37)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',38)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',39)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',40)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',41)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',42)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',43)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',44)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',45)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',46)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',47)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',48)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',49)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',50)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',51)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',52)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',53)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',54)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',55)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',56)'}</span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',57)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',58)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',59)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',60)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',61)'}</span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',62)'}</span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',63)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',64)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',65)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',66)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',67)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',68)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',69)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',70)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',71)'}</span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',72)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',73)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',74)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',75)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',76)'}</span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',77)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',78)'}
        </span>
      </div>
      <div className="square my-tooltip">
        <span className="tooltiptext top">
          {'(' + (index+1) + ',79)'}
        </span>
      </div><div className="square my-tooltip">
      <span className="tooltiptext top">
        {'(' + (index+1) + ',80)'}
      </span>
    </div>
    <div className="square my-tooltip">
      <span className="tooltiptext top">
        {'(' + (index+1) + ',81)'}
      </span>
    </div>
    <div className="square my-tooltip">
      <span className="tooltiptext top">
        {'(' + (index+1) + ',82)'}
      </span>
    </div><div className="square my-tooltip">
    <span className="tooltiptext top">
      {'(' + (index+1) + ',83)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
      {'(' + (index+1) + ',84)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
      {'(' + (index+1) + ',85)'}</span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
      {'(' + (index+1) + ',86)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
      {'(' + (index+1) + ',87)'}
    </span>
    </div><div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',88)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',89)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',90)'}</span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',91)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',92)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',93)'}
    </span>
    </div><div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',94)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',95)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',96)'}
    </span>
    </div><div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',97)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',98)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',99)'}</span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',100)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',101)'}
    </span>
    </div><div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',102)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',103)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',104)'}</span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',105)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',106)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',107)'}
    </span>
    </div><div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',108)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',109)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',110)'}
    </span>
    </div><div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',111)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',112)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',113)'}</span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',114)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',115)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',116)'}
    </span>
    </div><div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',117)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',118)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',119)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',120)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',121)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',122)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',123)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',124)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',125)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',126)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',127)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',128)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',129)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',130)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',131)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',132)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',133)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',134)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',135)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',136)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',137)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',138)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',139)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',140)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',141)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',142)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',143)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',144)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',145)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',146)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',147)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext top">
    {'(' + (index+1) + ',148)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext left">
    {'(' + (index+1) + ',149)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext left">
    {'(' + (index+1) + ',150)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext left">
    {'(' + (index+1) + ',151)'}
    </span>
    </div>
    <div className="square my-tooltip">
    <span className="tooltiptext left">
    {'(' + (index+1) + ',152)'}
    </span>
    </div>
</div>
  )
}

const ListSquare = ({enableSpinner,disableSpinner}) =>{
  useEffect(()=>{
    disableSpinner();
  },[disableSpinner])

  return(

    <List
      className="List"
      height={670}
      itemCount={264}
      itemSize={10}
      width={1550}
    >
      {Cols}
    </List>

  )
}

export default ListSquare;
