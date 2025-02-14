import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const marketplaceAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const tokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

const marketplaceABI = [
  "function listModel(string name, string description, uint256 price, string fileUrl)",
  "function buyModel(uint256 modelId)",
  "function getModels() view returns (tuple(uint256 id, string name, string description, uint256 price, address seller, bool sold, string fileUrl)[])"
];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const [modelPrice, setModelPrice] = useState("");
  const [modelFileUrl, setModelFileUrl] = useState("");
  
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setAccount(address);
        updateBalance(provider, address);
        fetchModels(provider);
      }
    };
    init();
  }, []);

  const updateBalance = async (provider, userAddress) => {
    try {
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
      const balance = await tokenContract.balanceOf(userAddress);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Ошибка при обновлении баланса:", error);
    }
  };

  const fetchModels = async (provider) => {
    if (!provider) return;
    try {
      const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, provider);
      const models = await contract.getModels();
      setModels(models);
    } catch (error) {
      console.error("Ошибка при загрузке моделей:", error);
    }
  };

  const addModel = async () => {
    if (!signer || !modelName || !modelDescription || !modelPrice || !modelFileUrl) return;
    try {
      const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);
      const tx = await contract.listModel(modelName, modelDescription, ethers.parseEther(modelPrice), modelFileUrl);
      await tx.wait();
      alert("Модель успешно добавлена!");
      fetchModels(provider);
    } catch (error) {
      console.error("Ошибка при добавлении модели:", error);
      alert("Ошибка при добавлении модели.");
    }
  };

  const buyModel = async (modelId, price) => {
    if (!signer) return;
    try {
      const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      
      let approveTx = await tokenContract.approve(marketplaceAddress, price);
      await approveTx.wait();
      
      let tx = await marketplaceContract.buyModel(modelId);
      await tx.wait();
      
      await updateBalance(provider, account);
      fetchModels(provider);
      alert("Модель успешно куплена!");
    } catch (error) {
      console.error("Ошибка при покупке модели:", error);
      alert("Ошибка при покупке модели.");
    }
  };

  return (
    <div className="App">
      <h1>Кошелёк</h1>
      <p><strong>Адрес:</strong> {account}</p>
      <p><strong>Баланс MTK:</strong> {balance}</p>
      
      <h2>Добавить AI модель</h2>
      <input type="text" placeholder="Название" value={modelName} onChange={(e) => setModelName(e.target.value)} />
      <input type="text" placeholder="Описание" value={modelDescription} onChange={(e) => setModelDescription(e.target.value)} />
      <input type="text" placeholder="Цена в MTK" value={modelPrice} onChange={(e) => setModelPrice(e.target.value)} />
      <input type="text" placeholder="Ссылка на файл" value={modelFileUrl} onChange={(e) => setModelFileUrl(e.target.value)} />
      <button onClick={addModel}>Добавить модель</button>
      
      <h2>Доступные AI модели</h2>
      <ul>
        {models.map((model, index) => (
        <li key={index}>
        <strong>{model.name}</strong> - {model.description} - Цена: {ethers.formatEther(model.price)} MTK
        <button onClick={() => buyModel(model.id, model.price)}>Купить</button>
      </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
