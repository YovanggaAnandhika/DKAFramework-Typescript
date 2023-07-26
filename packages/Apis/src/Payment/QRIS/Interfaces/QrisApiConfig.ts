

export interface QrisApiConfig {
    apikey : string,
    mID : string
}

export interface QrisConfigCreateInvoice {
    cliTrxNumber ?: string,
    cliTrxAmount ?: number,
    checkingIntervalMs ?: number
}

export interface QrisConfigCheckStatusOptions {
    checkingIntervalMs ?: number
}
export interface QrisConfigCheckStatus {
    qris_invoiceid ?: number,
    trxvalue ?: number,
    trxdate ?: Date,
    options ?: QrisConfigCheckStatusOptions,
    onResponse : (result : QrisCheckStatusCallback) => void
}

export interface QrisCreateInvoiceCallbackData {
    qris_content ?: string,
    qris_request_date ?: string,
    qris_invoiceid ?: number,
    qris_nmid ?: string
}

export interface QrisCreateInvoiceCallback {
    status ?: "success" | "failed",
    data ?: QrisCreateInvoiceCallbackData
}

export interface QrisCheckStatusCallbackData {
    qris_status : "paid" | "unpaid",
    qris_payment_customername : string,
    qris_payment_methodby : string

}
export interface QrisCheckStatusCallback {
    status ?: "success" | "failed",
    data ?: QrisCheckStatusCallbackData
    qris_api_version_code : number
}