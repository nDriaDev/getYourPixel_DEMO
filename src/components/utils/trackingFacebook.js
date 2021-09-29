import ReactPixel from 'react-facebook-pixel';

class FacebookTracer {
    
    constructor(){
        this.tracer = null;
        this.id  = process.env.REACT_APP_FB_TRACKING_ID ?? 
        '<insert your trackID here>'
        ;
    }

    initTracer() {
        if(!this.tracer) {
            this.tracer = ReactPixel;
            this.tracer.init(
                this.id, 
                null, 
                {
                    autoConfig: true, 
                    debug: false
                }
            );
        }
    }

    tracePage(){
        this.tracer.pageView();
    }
}

export default new FacebookTracer();