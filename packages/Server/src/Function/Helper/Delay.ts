

export const Delay = function ( delay : number | undefined ) {
    return new Promise ( function ( fulfill ) {
        if (delay !== undefined){
            setTimeout( fulfill, delay );
        }else{
            setTimeout( fulfill, 0 );
        }
    })
}

export default Delay;