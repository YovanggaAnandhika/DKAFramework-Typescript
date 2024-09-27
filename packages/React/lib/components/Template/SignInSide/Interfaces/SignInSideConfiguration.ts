

export interface SignInForm {
    username : string | undefined;
    password : string | undefined
}

export interface SignInSideConfiguration {
    onSubmit ?: (loginData : SignInForm) => void;
}