


Documentasi Satu Sehat

```typescript

/***
 * API Bridge SatuSehat Mastery Patient Data
 * Created by : Yovangga Anandhika
 */
const SastuSehat = new Apis.Health.satusehat({
    state: SatuSehatConfigConstructorState.STAGING,
    credentials: {
        auth: {
            clientId: "<token-here>",
            clientSecret: "<token-here>"
        }
    }
});
/**
 * Dapatkan Kode Token Dari Module **/
const token = await SastuSehat.getAccessToken();
/**
 * Get Module Resources Patient Data Index
 */
const MasterPasien = SastuSehat
    .getResources(token.access_token)
    .MasterPatientIndex()
/**
 * Read & Get Data patient By Nik
 */
const DataPasien = await MasterPasien.Read("personal",{ identifier : 898392823983892 });
/**
 * Edit Data Patient
 */
const DataPasienUpdate = await MasterPasien.Update(DataPasien.data.entry[0].fullUrl, [
    { op : "replace", path : "/active", value : false }
]);

```