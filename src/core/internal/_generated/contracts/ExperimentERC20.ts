export const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "name_",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "symbol_",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "scalar_",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "fallback",
    "stateMutability": "payable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "DOMAIN_SEPARATOR",
    "inputs": [],
    "outputs": [
      {
        "name": "result",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "cancelOwnershipHandover",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "completeOwnershipHandover",
    "inputs": [
      {
        "name": "pendingOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "nonces",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "result",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ownershipHandoverExpiresAt",
    "inputs": [
      {
        "name": "pendingOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "permit",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deadline",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "v",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "r",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "s",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "requestOwnershipHandover",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "setMintCap",
    "inputs": [
      {
        "name": "mintCap",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "swap",
    "inputs": [
      {
        "name": "target",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [
      {
        "name": "result",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipHandoverCanceled",
    "inputs": [
      {
        "name": "pendingOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipHandoverRequested",
    "inputs": [
      {
        "name": "pendingOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "oldOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AllowanceOverflow",
    "inputs": []
  },
  {
    "type": "error",
    "name": "AllowanceUnderflow",
    "inputs": []
  },
  {
    "type": "error",
    "name": "AlreadyInitialized",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientAllowance",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientBalance",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidPermit",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NewOwnerIsZeroAddress",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NoHandoverRequest",
    "inputs": []
  },
  {
    "type": "error",
    "name": "Permit2AllowanceIsFixedAtInfinity",
    "inputs": []
  },
  {
    "type": "error",
    "name": "PermitExpired",
    "inputs": []
  },
  {
    "type": "error",
    "name": "TotalSupplyOverflow",
    "inputs": []
  },
  {
    "type": "error",
    "name": "Unauthorized",
    "inputs": []
  }
] as const;

export const code = "0x608060405234801561000f575f5ffd5b506040516110c43803806110c483398101604081905261002e91610140565b5f610039848261023c565b506001610046838261023c565b5060028190556001600160801b0360035561006033610068565b5050506102fa565b6001600160a01b0316638b78c6d819819055805f7f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b634e487b7160e01b5f52604160045260245ffd5b5f82601f8301126100c6575f5ffd5b81516001600160401b038111156100df576100df6100a3565b604051601f8201601f19908116603f011681016001600160401b038111828210171561010d5761010d6100a3565b604052818152838201602001851015610124575f5ffd5b8160208501602083015e5f918101602001919091529392505050565b5f5f5f60608486031215610152575f5ffd5b83516001600160401b03811115610167575f5ffd5b610173868287016100b7565b602086015190945090506001600160401b03811115610190575f5ffd5b61019c868287016100b7565b925050604084015190509250925092565b600181811c908216806101c157607f821691505b6020821081036101df57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f821115610237578282111561023757805f5260205f20601f840160051c602085101561021057505f5b90810190601f840160051c035f5b81811015610233575f8382015560010161021e565b5050505b505050565b81516001600160401b03811115610255576102556100a3565b6102698161026384546101ad565b846101e5565b6020601f82116001811461029b575f83156102845750848201515b5f19600385901b1c1916600184901b1784556102f3565b5f84815260208120601f198516915b828110156102ca57878501518255602094850194600190920191016102aa565b50848210156102e757868401515f19600387901b60f8161c191681555b505060018360011b0184555b5050505050565b610dbd806103075f395ff3fe60806040526004361061012b575f3560e01c8063715018a6116100a4578063d505accf1161006b578063d505accf14610310578063dd62ed3e1461032f578063df791e501461034e578063f04e283e1461036d578063f2fde38b14610380578063fee81cf41461039357005b8063715018a6146102795780637ecebe00146102815780638da5cb5b146102b257806395d89b41146102dd578063a9059cbb146102f157005b8063313ce567116100f3578063313ce567146101d35780633644e515146101ee5780634070a0c91461020257806340c10f191461022157806354d1f13d1461024057806370a082311461024857005b806306fdde031461012d578063095ea7b31461015757806318160ddd1461018657806323b872dd146101ac57806325692962146101cb575b005b348015610138575f5ffd5b506101416103c4565b60405161014e9190610ba2565b60405180910390f35b348015610162575f5ffd5b50610176610171366004610bf2565b610453565b604051901515815260200161014e565b348015610191575f5ffd5b506805345cdf77eb68f44c545b60405190815260200161014e565b3480156101b7575f5ffd5b506101766101c6366004610c1a565b6104d3565b61012b61058f565b3480156101de575f5ffd5b506040516012815260200161014e565b3480156101f9575f5ffd5b5061019e6105dc565b34801561020d575f5ffd5b5061012b61021c366004610c54565b610658565b34801561022c575f5ffd5b5061012b61023b366004610bf2565b610665565b61012b6106bc565b348015610253575f5ffd5b5061019e610262366004610c6b565b6387a211a2600c9081525f91909152602090205490565b61012b6106f5565b34801561028c575f5ffd5b5061019e61029b366004610c6b565b6338377508600c9081525f91909152602090205490565b3480156102bd575f5ffd5b50638b78c6d819546040516001600160a01b03909116815260200161014e565b3480156102e8575f5ffd5b50610141610708565b3480156102fc575f5ffd5b5061017661030b366004610bf2565b610717565b34801561031b575f5ffd5b5061012b61032a366004610c84565b610729565b34801561033a575f5ffd5b5061019e610349366004610cf1565b6108dd565b348015610359575f5ffd5b5061012b610368366004610c1a565b610921565b61012b61037b366004610c6b565b6109ba565b61012b61038e366004610c6b565b6109f7565b34801561039e575f5ffd5b5061019e6103ad366004610c6b565b63389a75e1600c9081525f91909152602090205490565b60605f80546103d290610d22565b80601f01602080910402602001604051908101604052809291908181526020018280546103fe90610d22565b80156104495780601f1061042057610100808354040283529160200191610449565b820191905f5260205f20905b81548152906001019060200180831161042c57829003601f168201915b5050505050905090565b5f6001600160a01b0383166e22d473030f116ddee9f6b43ac78ba3188219151761048457633f68539a5f526004601cfd5b82602052637f5e9f20600c52335f52816034600c2055815f52602c5160601c337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560205fa35060015b92915050565b5f8360601b6e22d473030f116ddee9f6b43ac78ba333146105285733602052637f5e9f208117600c526034600c208054801915610525578085111561051f576313be252b5f526004601cfd5b84810382555b50505b6387a211a28117600c526020600c2080548085111561054e5763f4d678b85f526004601cfd5b84810382555050835f526020600c208381540181555082602052600c5160601c8160601c5f516020610d9d5f395f51905f52602080a3505060019392505050565b5f6202a30067ffffffffffffffff164201905063389a75e1600c52335f52806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d5f5fa250565b5f806105e66103c4565b805190602001209050604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f815260208101929092527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc69082015246606082015230608082015260a09020919050565b610660610a1d565b600355565b60035481106106ae5760405162461bcd60e51b8152602060048201526011602482015270135a5b9d0818d85c08195e18d959591959607a1b604482015260640160405180910390fd5b6106b88282610a37565b5050565b63389a75e1600c52335f525f6020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c925f5fa2565b6106fd610a1d565b6107065f610aa0565b565b6060600180546103d290610d22565b5f6107228383610add565b9392505050565b6001600160a01b0386166e22d473030f116ddee9f6b43ac78ba3188519151761075957633f68539a5f526004601cfd5b5f6107626103c4565b8051906020012090507fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6428610156107a157631a15a3cc5f526004601cfd5b6040518960601b60601c99508860601b60601c985065383775081901600e52895f526020600c2080547f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f835284602084015283604084015246606084015230608084015260a08320602e527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c983528b60208401528a60408401528960608401528060808401528860a084015260c08320604e526042602c205f528760ff16602052866040528560605260208060805f60015afa8c3d51146108895763ddafbaef5f526004601cfd5b0190556303faf4f960a51b89176040526034602c20889055888a7f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925602060608501a360405250505f60605250505050505050565b5f6e22d473030f116ddee9f6b43ac78ba2196001600160a01b0383160161090657505f196104cd565b50602052637f5e9f20600c9081525f91909152603490205490565b61092b3382610b41565b826001600160a01b03166340c10f1983670de0b6b3a7640000600254856109529190610d5a565b61095c9190610d7d565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044015f604051808303815f87803b15801561099f575f5ffd5b505af11580156109b1573d5f5f3e3d5ffd5b50505050505050565b6109c2610a1d565b63389a75e1600c52805f526020600c2080544211156109e857636f5e88185f526004601cfd5b5f90556109f481610aa0565b50565b6109ff610a1d565b8060601b610a1457637448fbae5f526004601cfd5b6109f481610aa0565b638b78c6d819543314610706576382b429005f526004601cfd5b6805345cdf77eb68f44c5481810181811015610a5a5763e5cfe9575f526004601cfd5b806805345cdf77eb68f44c5550506387a211a2600c52815f526020600c208181540181555080602052600c5160601c5f5f516020610d9d5f395f51905f52602080a35050565b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a355565b5f6387a211a2600c52335f526020600c20805480841115610b055763f4d678b85f526004601cfd5b83810382555050825f526020600c208281540181555081602052600c5160601c335f516020610d9d5f395f51905f52602080a350600192915050565b6387a211a2600c52815f526020600c20805480831115610b685763f4d678b85f526004601cfd5b82900390556805345cdf77eb68f44c805482900390555f8181526001600160a01b0383165f516020610d9d5f395f51905f52602083a35050565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b80356001600160a01b0381168114610bed575f5ffd5b919050565b5f5f60408385031215610c03575f5ffd5b610c0c83610bd7565b946020939093013593505050565b5f5f5f60608486031215610c2c575f5ffd5b610c3584610bd7565b9250610c4360208501610bd7565b929592945050506040919091013590565b5f60208284031215610c64575f5ffd5b5035919050565b5f60208284031215610c7b575f5ffd5b61072282610bd7565b5f5f5f5f5f5f5f60e0888a031215610c9a575f5ffd5b610ca388610bd7565b9650610cb160208901610bd7565b95506040880135945060608801359350608088013560ff81168114610cd4575f5ffd5b9699959850939692959460a0840135945060c09093013592915050565b5f5f60408385031215610d02575f5ffd5b610d0b83610bd7565b9150610d1960208401610bd7565b90509250929050565b600181811c90821680610d3657607f821691505b602082108103610d5457634e487b7160e01b5f52602260045260245ffd5b50919050565b80820281158282048414176104cd57634e487b7160e01b5f52601160045260245ffd5b5f82610d9757634e487b7160e01b5f52601260045260245ffd5b50049056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" as const;
