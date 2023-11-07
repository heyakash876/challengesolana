 <div className="App">
      <header className="App-header">
        <h2>Connect to Phantom Wallet</h2>
        {provider && !walletKey && (
          <button
            style={{ fontSize: "16px", padding: "15px", fontWeight: "bold", borderRadius: "5px" }}
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
        {provider && walletKey && (
          <div>
            <p>Connected account</p>
            <button
              style={{ fontSize: "16px", padding: "15px", fontWeight: "bold", borderRadius: "5px" }}
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </button>
          </div>
        )}
        {!provider && (
          <p>
            No provider found. Install{" "}
            <a href="https://phantom.app/">Phantom Browser extension</a>
          </p>
        )}
      </header>
    </div>
  );
}
