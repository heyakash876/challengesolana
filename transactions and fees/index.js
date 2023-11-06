// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} = require("@solana/web3.js");


// Making a keypair and getting the private key
/*const newPair = Keypair.generate();
console.log("Below is what you will paste into your code:\n")
console.log(newPair.secretKey);*/
 
const DEMO_FROM_SECRET_KEY = new Uint8Array(
    // paste your secret key inside this empty array
    // then uncomment transferSol() at the bottom
    [   240, 125,  40, 246, 181, 168, 231,  66,  55,  34, 199,
        221, 214,  61, 192, 131, 106, 217,  82, 177, 157, 241,
        238,  12,  34,  16,  40, 121,  53, 111, 244,  71, 210,
        135, 245, 109, 104,  10, 237,  64, 143,  76, 220, 252,
        213,  86, 107,  58, 121,  87,  82, 113,  57, 148,  94,
         74,   9, 147, 106, 106, 222, 253, 102, 110
        
    ]            
);

const transferHalfBalance = async() => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Get Keypair from Secret Key
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    // Generate another Keypair (account we'll be sending to)
    const to = Keypair.generate();

    // Get the balance of the sender's wallet
    let balance = await connection.getBalance(from.publicKey);
    console.log(`Sender's balance is ${balance / LAMPORTS_PER_SOL} SOL`);

    // Calculate half of the sender's balance
    let halfBalance = balance / 2;
    console.log(`Half of the sender's balance is ${halfBalance / LAMPORTS_PER_SOL} SOL`);

    // Send half of the sender's balance from "from" wallet and into "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: halfBalance
        })
    );

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log('Signature is', signature);
}

transferHalfBalance();


/*const transferSol = async() => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Get Keypair from Secret Key
    var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    // (Optional) - Other things you can try: 
    // 1) Form array from userSecretKey
    // const from = Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
    // 2) Make a new Keypair (starts with 0 SOL)
    // const from = Keypair.generate();

    // Generate another Keypair (account we'll be sending to)
    const to = Keypair.generate();

    // Aidrop 2 SOL to Sender wallet
    console.log("Airdopping some SOL to Sender wallet!");
    const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(from.publicKey),
        2 * LAMPORTS_PER_SOL
    );

    // Latest blockhash (unique identifer of the block) of the cluster
    let latestBlockHash = await connection.getLatestBlockhash();

    // Confirm transaction using the last valid block height (refers to its time)
    // to check for transaction expiration
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: fromAirDropSignature
    });

    console.log("Airdrop completed for the Sender account");

    // Send money from "from" wallet and into "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: LAMPORTS_PER_SOL / 100
        })
    );

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log('Signature is', signature);
}

transferSol();*/
