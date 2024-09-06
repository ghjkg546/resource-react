

 export  interface TokenEntity {
    id: number;
    accessToken: TokenBody;
}


interface TokenBody {
    access_token: string;
}