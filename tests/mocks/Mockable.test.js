let Mockable = require('./Mockable');
const {OK, ERR_TIRED} = require("@screeps/common/lib/constants");



describe('mockable.1 > Typed Structures basic construction', () => {
    it('mockable.1.1 > Fake call once, with default response',()=>{
        let m = new Mockable();
        expect(m._func_wasCalled("moveTo")).toBe(false);
        let res = m._func_fake("moveTo",{x:4,y:5,opts:{ignoreCreeps:true}},OK);
        expect(res).toBe(OK);
        expect(m._func_activeCallParams("moveTo")).toStrictEqual({x:4,y:5,opts:{ignoreCreeps:true}})
        expect(m._func_wasCalled("moveTo")).toBe(true);
    })
    it('mockable.1.2 > Fake call thrice, with default response',()=>{
        let m = new Mockable();
        expect(m._func_wasCalled("moveTo")).toBe(false);
        m._func_fake("moveTo",{x:4,y:5,opts:{}},OK);
        m._func_fake("moveTo",{x:3,y:3,opts:{}},OK);
        let res = m._func_fake("moveTo",{x:6,y:6,opts:{}},OK);
        expect(res).toBe(OK);
        expect(m._func_activeCallParams("moveTo")).toStrictEqual({x:6,y:6,opts:{}})
        expect(m._func_nthCallParams("moveTo",1)).toStrictEqual({x:4,y:5,opts:{}})
        expect(m._func_nthCallParams("moveTo",2)).toStrictEqual({x:3,y:3,opts:{}})
        expect(m._func_nthCallParams("moveTo",3)).toStrictEqual({x:6,y:6,opts:{}})
        expect(m._func_wasCalled("moveTo")).toBe(true);
        expect(m._func_CallCount("moveTo")).toBe(3);
    })
    it('mockable.1.3 > Fake call once, with set response',()=>{
        let m = new Mockable();
        m._func_setResponse("moveTo",ERR_TIRED)
        expect(m._func_wasCalled("moveTo")).toBe(false);
        let res = m._func_fake("moveTo",{x:4,y:5,opts:{}},OK);
        expect(res).toBe(ERR_TIRED);
        expect(m._func_activeCallParams("moveTo")).toStrictEqual({x:4,y:5,opts:{}})
        expect(m._func_wasCalled("moveTo")).toBe(true);
    })
    it('mockable.1.4 > Fake thrice once, with set response',()=>{
        let m = new Mockable();
        m._func_setResponse("moveTo",ERR_TIRED)
        expect(m._func_wasCalled("moveTo")).toBe(false);
        m._func_fake("moveTo",{x:4,y:5,opts:{}},OK);
        m._func_fake("moveTo",{x:3,y:3,opts:{}},OK);
        let res = m._func_fake("moveTo",{x:6,y:6,opts:{}},OK);
        expect(res).toBe(ERR_TIRED);
        expect(m._func_activeCallParams("moveTo")).toStrictEqual({x:6,y:6,opts:{}})
        expect(m._func_nthCallParams("moveTo",1)).toStrictEqual({x:4,y:5,opts:{}})
        expect(m._func_nthCallParams("moveTo",2)).toStrictEqual({x:3,y:3,opts:{}})
        expect(m._func_nthCallParams("moveTo",3)).toStrictEqual({x:6,y:6,opts:{}})
        expect(m._func_wasCalled("moveTo")).toBe(true);
        expect(m._func_CallCount("moveTo")).toBe(3);

    })
    it('mockable.1.5 > Fake call with no params',()=>{
        let m = new Mockable();
        expect(m._func_wasCalled("suicide")).toBe(false);
        let res = m._func_fake("suicide",undefined,OK);
        expect(res).toBe(OK);
        expect(m._func_activeCallParams("suicide")).toBe(undefined)
        expect(m._func_wasCalled("suicide")).toBe(true);
    })
})