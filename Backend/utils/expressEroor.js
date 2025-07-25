class expressError extends Error{
    constructor(statusCode,msg){
        super();
        this.status=statusCode;
        this.message=msg;
    }
}

module.exports=expressError;