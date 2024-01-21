import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Auth: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const metaMaskAddress = accounts[0];

        // Simulate user registration (store in local storage)
        const storedUser = localStorage.getItem(metaMaskAddress);
        if (storedUser) {
          setUser(storedUser);
        } else {
          const username = prompt('Enter your username:');
          if (username) {
            localStorage.setItem(metaMaskAddress, username);
            setUser(username);
          }
        }

        setAccount(metaMaskAddress);

        // Initialize the provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Fetch the balance
        const address = await provider.getSigner().getAddress();
        const weiBalance = await provider.getBalance(address);
        const etherBalance = ethers.utils.formatEther(weiBalance);
        setBalance(etherBalance);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('MetaMask is not installed or not detected.');
    }
  };

  useEffect(() => {
    connectToMetaMask();
  }, []);

  return (
    <div className='text-center'>
      {user ? (
        <p>Welcome, {user} (Connected to MetaMask as {account})</p>
      ) : (
        <div>
          <p>Connect to MetaMask to authenticate:</p>
          {account ? (
            <p>Connected to MetaMask as {account}</p>
          ) : (
            <button className='p-2 rounded-2xl border-2 bg-orange-400 border-orange-400 hover:bg-transparent hover:text-orange-400 duration-300 ease-in-out' onClick={connectToMetaMask}>Connect to MetaMask</button>
          )}
        </div>
      )}
      {balance && <p className='text-orange-400 drop-shadow-xl shadow-white font-bold'>Balance: {balance} ETH</p>}
    </div>
  );
};

export default Auth;
