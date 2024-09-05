/**
 * @file mofron-comp-okcanceltxt/index.js
 * @brief image switch component for mofron
 * @license MIT
 */
const Image   = require('mofron-comp-image');  
const Click   = require('mofron-event-click');
const ConfArg = mofron.class.ConfArg;
const comutl  = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('ImageSwitch');
            
            this.confmng().add('switchEvent', { type:'event', list:true });
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts () {
        try {
	    super.initDomConts();
            
            let sw = this;
            this.event(
	        new Click({
                    listener: () => { sw.switch(); },
                    tag: this.id()
                })
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    disableClick () {
        try {
            this.event({ modname:'Click',tag:this.id() }).suspend(true);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    beforeRender () {
        try {
            super.beforeRender();
            let chd = this.child();
            for (let cidx in chd) {
                chd[cidx].style({
                    'display':'none'
                });
            }
            chd[0].style({ 'display': null });
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    switch (idx) {
        try {
            /* switching image */
            let set_idx = idx;
            let chd     = this.child();
            if (undefined === idx) {
                for (let cidx in chd) {
                    if (true === chd[cidx].visible()) {
                        set_idx = parseInt(cidx);
                        break;
                    }
                }
                if (undefined === set_idx) {
                    throw new Error('could not visible image');
                }
                set_idx++;
            } else if ('number' === typeof idx) {
                if (set_idx > chd.length) {
                    throw new Error('invalid parameter');
                }
                //set_idx++;
            }
            if (set_idx >= chd.length) {
                set_idx = 0;
            }
            for (let cidx_2 in chd) {
                chd[cidx_2].visible(false);
            }
            chd[set_idx].visible(true);
            
            /* execute event */
            let evt = this.switchEvent();
            for (let eidx in evt) {
                evt[eidx][0](this, set_idx,evt[eidx][1]);
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    switchEvent (fnc,prm) {
        try {
            if (undefined === fnc) {
                return this.confmng('switchEvent');
	    }
	    this.confmng('switchEvent', [fnc,prm]);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    images (prm, opt) {
        try {
	    if (Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.images(prm[pidx],opt);
		}
		return;
	    }
	    let set_prm = prm;
	    if ('string' === typeof prm) {
                set_prm = new Image(prm);
		set_prm.config(opt);
	    }
	    if (true !== comutl.isinc(set_prm, 'Image')) {
                throw new Error('invalid parameter');
	    }
            this.child(set_prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    getIndex () {
        try {
            let chd = this.child();
            for (let cidx in chd) {
                if (true === chd[cidx].visible()) {
                    return parseInt(cidx);                    
                }
            }
	    return null;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
