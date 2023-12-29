/**
 * A class that underpins all the Screeps API mock objects.
 * This provides utilities for mocking or faking function calls on the Game objects.
 * The desired response can be set before a test then call params retrieved after.
 * This removes the need to have the working server code.
 * We just test how our code performs when an API function return A or B
 * This is lighter than running screeps server, so Unit Tests can be quicker
 *
 * Example:
 * // test trading code where a terminal is tired
 * Game.rooms['W1N1'].terminal._func_setResponse('send',ERR_TIRED)
 *
 * // So Game.rooms['W1N1'].terminal.send(RESOURCE_ENERGY,6000,'W2N2')...will return -11
 *
 * // < run tested trade code here >
 *
 * Game.rooms['W1N1'].terminal._func_activeCallParams('send')
 * // returns {resourceType:RESOURCE_ENERGY,amount:6000,destination:'W2N2',description:''}
 *
 *
 */

class Mockable{
    constructor() {
        this.__func_mocks={};
    }

    //////////////////////////////////////////////////////////////////
    // Private Functions
    //////////////////////////////////////////////////////////////////
    __createMockFunc(funcName){
        this.__func_mocks[funcName]={
            response:0,// API CONSTANT : OK
            calls:[]
        }
    }
    //////////////////////////////////////////////////////////////////
    // Public Unit Test utility Functions
    //////////////////////////////////////////////////////////////////
    /**
     * set the response value for a given screeps api function
     * that will be faked/mocked with _func_fake
     * @param funcName
     * @param responseCode
     * @private
     */
    _func_setResponse(funcName,responseCode){
        if(!this.__func_mocks[funcName]){
            this.__createMockFunc(funcName);
        }
        this.__func_mocks[funcName].response = responseCode;
    }

    /**
     * fake a function call and record params passed.
     * returning either defaultResponse or a response set by
     * _func_setResponse()
     * @param funcName
     * @param callParams
     * @param defaultResponse
     * @returns {any}
     * @private
     */
    _func_fake(funcName,callParams,defaultResponse){
        if(!this.__func_mocks[funcName]){
            this._func_setResponse(funcName,defaultResponse);
        }
        this.__func_mocks[funcName].calls.push(callParams);
        return this.__func_mocks[funcName].response;
    }

    /**
     * target a specific call in a given run, to get the params passed.
     * This allows you to diagnose what was called in what order.
     * for example if creep.move() was called 3 times, then you can retrieve
     * the params for calls 1,2,3.
     * You ideally don't want many calls, but useful to test if they happen
     * @param funcName
     * @param nthCall -> is when it was called this tick. So 2 would be 2nd call
     * @returns {undefined|Object} > when keys match params from screeps api docs
     * @private
     */
    _func_nthCallParams(funcName,nthCall){
        if(this.__func_mocks[funcName]){
            if(this.__func_mocks[funcName].calls[nthCall-1]){
                return this.__func_mocks[funcName].calls[nthCall-1];
            }else{
                return undefined;
            }
        }
        return undefined;
    }

    /**
     * Retrieve the params passed to the "last" call of this function, this tick.
     * This will tell you which params will actually run on the API, because most
     * screep functions run the last call, if there are duplicates.
     * @param funcName
     * @returns {undefined|Object} -> when keys match params from screeps api docs
     * @private
     */
    _func_activeCallParams(funcName){
        if(this.__func_mocks[funcName]){

            if(this.__func_mocks[funcName].calls.length>0){
                let i = this.__func_mocks[funcName].calls.length;
                return this.__func_mocks[funcName].calls[i-1];
            }else{
                return undefined;
            }
        }
        return undefined;
    }

    /**
     * was this function call at least once during test run
     * @param funcName
     * @returns {boolean}
     * @private
     */
    _func_wasCalled(funcName){
        if(this.__func_mocks[funcName]){
            return (this.__func_mocks[funcName].calls.length>0)
        }
        return false;
    }

    /**
     * How many times was this function called during the test run
     * @param funcName
     * @returns {number}
     * @private
     */
    _func_CallCount(funcName){
        if(this.__func_mocks[funcName]){
            return this.__func_mocks[funcName].calls.length
        }
        return 0;
    }
}
module.exports = Mockable;