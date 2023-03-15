import Database, {Firestore, MariaDB, MongoDB} from "./../src";


(async () => {

    let db = new MariaDB({
        encryption : {}
    })

        .Baca(`user`).then(async (res : any) => {
        console.log(res)
    }).catch(async (res) => {
        console.error(res)
    });


})();


