export const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "symbol_",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "name_",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "description",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "image",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "price",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
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
    "name": "getApproved",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "isApprovedForAll",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
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
    "name": "ownerOf",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "safeTransferFrom",
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
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
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
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "data",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "setApprovalForAll",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setImage",
    "inputs": [
      {
        "name": "image",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "inputs": [
      {
        "name": "interfaceId",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [
      {
        "name": "result",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
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
    "name": "tokenURI",
    "inputs": [
      {
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
        "name": "id",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
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
        "name": "account",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ApprovalForAll",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
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
        "name": "id",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AccountBalanceOverflow",
    "inputs": []
  },
  {
    "type": "error",
    "name": "AlreadyInitialized",
    "inputs": []
  },
  {
    "type": "error",
    "name": "BalanceQueryForZeroAddress",
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
    "name": "NotOwnerNorApproved",
    "inputs": []
  },
  {
    "type": "error",
    "name": "TokenAlreadyExists",
    "inputs": []
  },
  {
    "type": "error",
    "name": "TokenDoesNotExist",
    "inputs": []
  },
  {
    "type": "error",
    "name": "TransferFromIncorrectOwner",
    "inputs": []
  },
  {
    "type": "error",
    "name": "TransferToNonERC721ReceiverImplementer",
    "inputs": []
  },
  {
    "type": "error",
    "name": "TransferToZeroAddress",
    "inputs": []
  },
  {
    "type": "error",
    "name": "Unauthorized",
    "inputs": []
  }
] as const;

export const code = "0x608060405234801561000f575f5ffd5b506040516115ea3803806115ea83398101604081905261002e91610189565b600161003a85826102f0565b50600461004784826102f0565b50600261005486826102f0565b50600361006187826102f0565b50600580546001600160a01b0319166001600160a01b038416179055600681905561008b33610096565b5050505050506103ae565b6001600160a01b0316638b78c6d819819055805f7f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08180a350565b634e487b7160e01b5f52604160045260245ffd5b5f82601f8301126100f4575f5ffd5b81516001600160401b0381111561010d5761010d6100d1565b604051601f8201601f19908116603f011681016001600160401b038111828210171561013b5761013b6100d1565b604052818152838201602001851015610152575f5ffd5b8160208501602083015e5f918101602001919091529392505050565b80516001600160a01b0381168114610184575f5ffd5b919050565b5f5f5f5f5f5f60c0878903121561019e575f5ffd5b86516001600160401b038111156101b3575f5ffd5b6101bf89828a016100e5565b602089015190975090506001600160401b038111156101dc575f5ffd5b6101e889828a016100e5565b604089015190965090506001600160401b03811115610205575f5ffd5b61021189828a016100e5565b606089015190955090506001600160401b0381111561022e575f5ffd5b61023a89828a016100e5565b9350506102496080880161016e565b91505f60a08801519050809150509295509295509295565b600181811c9082168061027557607f821691505b60208210810361029357634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156102eb57828211156102eb57805f5260205f20601f840160051c60208510156102c457505f5b90810190601f840160051c035f5b818110156102e7575f838201556001016102d2565b5050505b505050565b81516001600160401b03811115610309576103096100d1565b61031d816103178454610261565b84610299565b6020601f82116001811461034f575f83156103385750848201515b5f19600385901b1c1916600184901b1784556103a7565b5f84815260208120601f198516915b8281101561037e578785015182556020948501946001909201910161035e565b508482101561039b57868401515f19600387901b60f8161c191681555b505060018360011b0184555b5050505050565b61122f806103bb5f395ff3fe60806040526004361061013c575f3560e01c806370a08231116100b3578063b88d4fde1161006d578063b88d4fde14610325578063c87b56dd14610338578063e985e9c514610357578063f04e283e1461038b578063f2fde38b1461039e578063fee81cf4146103b1575f5ffd5b806370a0823114610286578063715018a6146102b357806371adb5e6146102bb5780638da5cb5b146102da57806395d89b41146102f2578063a22cb46514610306575f5ffd5b806323b872dd1161010457806323b872dd14610212578063256929621461022557806342842e0e1461022d57806354d1f13d146102405780636352211e146102485780636a62784214610267575f5ffd5b806301ffc9a71461014057806306fdde0314610191578063081812fc146101b2578063095ea7b3146101e95780631249c58b146101fe575b5f5ffd5b34801561014b575f5ffd5b5061017c61015a366004610c8c565b6301ffc9a760e09190911c9081146380ac58cd821417635b5e139f9091141790565b60405190151581526020015b60405180910390f35b34801561019c575f5ffd5b506101a56103e2565b6040516101889190610cba565b3480156101bd575f5ffd5b506101d16101cc366004610cef565b610472565b6040516001600160a01b039091168152602001610188565b6101fc6101f7366004610d1c565b6104ad565b005b348015610209575f5ffd5b506101fc6104bc565b6101fc610220366004610d44565b610544565b6101fc61063e565b6101fc61023b366004610d44565b61068b565b6101fc6106b7565b348015610253575f5ffd5b506101d1610262366004610cef565b6106f0565b348015610272575f5ffd5b506101fc610281366004610d7e565b61072c565b348015610291575f5ffd5b506102a56102a0366004610d7e565b61074d565b604051908152602001610188565b6101fc610785565b3480156102c6575f5ffd5b506101fc6102d5366004610dab565b610796565b3480156102e5575f5ffd5b50638b78c6d819546101d1565b3480156102fd575f5ffd5b506101a56107aa565b348015610311575f5ffd5b506101fc610320366004610e6b565b6107b9565b6101fc610333366004610ea0565b61080c565b348015610343575f5ffd5b506101a5610352366004610cef565b610866565b348015610362575f5ffd5b5061017c610371366004610f35565b601c52670a5a2e7a000000006008525f526030600c205490565b6101fc610399366004610d7e565b6108cc565b6101fc6103ac366004610d7e565b610909565b3480156103bc575f5ffd5b506102a56103cb366004610d7e565b63389a75e1600c9081525f91909152602090205490565b6060600280546103f190610f66565b80601f016020809104026020016040519081016040528092919081815260200182805461041d90610f66565b80156104685780601f1061043f57610100808354040283529160200191610468565b820191905f5260205f20905b81548152906001019060200180831161044b57829003601f168201915b5050505050905090565b5f815f52673ec412a9852d173d60c11b601c5260205f2082018201805460601b6104a35763ceea21b65f526004601cfd5b6001015492915050565b6104b833838361092f565b5050565b6005546006546040516323b872dd60e01b815233600482015230602482015260448101919091526001600160a01b03909116906323b872dd906064016020604051808303815f875af1158015610514573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105389190610f9e565b506105423361072c565b565b5f818152673ec412a9852d173d60c11b3317601c52602090208101810180546001600160a01b0394851694938416938116919082861483026105955767ceea21b6a1148100831560021b526004601cfd5b855f5281600101549250823314863314176105c1576030600c20546105c157634b6e7f185f526004601cfd5b82156105ce575f82600101555b85851818905550601c600c81812080545f190190555f84905220805460010163ffffffff8116840261060f5767ea553b3401336cea841560021b526004601cfd5b90558082847fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef5f38a45b505050565b5f6202a30067ffffffffffffffff164201905063389a75e1600c52335f52806020600c2055337fdbf36a107da19e49527a7176a1babf963b4b0ff8cde35ee35d6cd8f1f9ac7e1d5f5fa250565b610696838383610544565b813b156106395761063983838360405180602001604052805f8152506109c9565b63389a75e1600c52335f525f6020600c2055337ffa7b8eab7da67f412cc9575ed43464468f9bfbae89d1675917346ca6d8fe3c925f5fa2565b5f818152673ec412a9852d173d60c11b601c526020902081018101546001600160a01b0316806107275763ceea21b65f526004601cfd5b919050565b610737815f54610a52565b5f8054908061074583610fb9565b919050555050565b5f8161076057638f4eb6045f526004601cfd5b673ec412a9852d173d60c11b601c52815f5263ffffffff601c600c2054169050919050565b61078d610aee565b6105425f610b08565b61079e610aee565b60046104b8828261102b565b6060600380546103f190610f66565b801515905081601c52670a5a2e7a00000000600852335f52806030600c2055805f528160601b60601c337f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160205fa35050565b610817858585610544565b833b1561085f5761085f85858585858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152506109c992505050565b5050505050565b60605f6108a2600261087785610b45565b6001600460405160200161088e949392919061116b565b604051602081830303815290604052610b87565b9050806040516020016108b591906111fe565b604051602081830303815290604052915050919050565b6108d4610aee565b63389a75e1600c52805f526020600c2080544211156108fa57636f5e88185f526004601cfd5b5f905561090681610b08565b50565b610911610aee565b8060601b61092657637448fbae5f526004601cfd5b61090681610b08565b5f1960601c82811692508381169350815f5283673ec412a9852d173d60c11b17601c5260205f2082018201805482169150816109725763ceea21b65f526004601cfd5b81851485151761099657815f526030600c205461099657634b6e7f185f526004601cfd5b6001018390558183827f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9255f38a450505050565b60405163150b7a028082523360208301528560601b60601c604083015283606083015260808083015282518060a08401528015610a10578060c08401826020870160045afa505b60208360a48301601c86015f8a5af1610a31573d15610a31573d5f843e3d83fd5b508060e01b825114610a4a5763d1a57ed65f526004601cfd5b505050505050565b8160601b60601c9150805f52673ec412a9852d173d60c11b601c5260205f208101810180548060601b15610a8d5763c991cbb15f526004601cfd5b831790555f829052601c600c20805460010163ffffffff81168402610ac15767ea553b3401336cea841560021b526004601cfd5b905580825f7fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8138a45050565b638b78c6d819543314610542576382b429005f526004601cfd5b638b78c6d81980546001600160a01b039092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a355565b60606080604051019050602081016040525f8152805f19835b928101926030600a8206018453600a900480610b5e575050819003601f19909101908152919050565b6060610b94825f5f610b9a565b92915050565b606083518015610c84576003600282010460021b60405192507f4142434445464748494a4b4c4d4e4f505152535455565758595a616263646566601f526106708515027f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392d5f18603f526020830181810183886020010180515f82525b60038a0199508951603f8160121c16515f53603f81600c1c1651600153603f8160061c1651600253603f811651600353505f518452600484019350828410610c15579052602001604052613d3d60f01b60038406600204808303919091525f8615159091029182900352900382525b509392505050565b5f60208284031215610c9c575f5ffd5b81356001600160e01b031981168114610cb3575f5ffd5b9392505050565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b5f60208284031215610cff575f5ffd5b5035919050565b80356001600160a01b0381168114610727575f5ffd5b5f5f60408385031215610d2d575f5ffd5b610d3683610d06565b946020939093013593505050565b5f5f5f60608486031215610d56575f5ffd5b610d5f84610d06565b9250610d6d60208501610d06565b929592945050506040919091013590565b5f60208284031215610d8e575f5ffd5b610cb382610d06565b634e487b7160e01b5f52604160045260245ffd5b5f60208284031215610dbb575f5ffd5b813567ffffffffffffffff811115610dd1575f5ffd5b8201601f81018413610de1575f5ffd5b803567ffffffffffffffff811115610dfb57610dfb610d97565b604051601f8201601f19908116603f0116810167ffffffffffffffff81118282101715610e2a57610e2a610d97565b604052818152828201602001861015610e41575f5ffd5b816020840160208301375f91810160200191909152949350505050565b8015158114610906575f5ffd5b5f5f60408385031215610e7c575f5ffd5b610e8583610d06565b91506020830135610e9581610e5e565b809150509250929050565b5f5f5f5f5f60808688031215610eb4575f5ffd5b610ebd86610d06565b9450610ecb60208701610d06565b935060408601359250606086013567ffffffffffffffff811115610eed575f5ffd5b8601601f81018813610efd575f5ffd5b803567ffffffffffffffff811115610f13575f5ffd5b886020828401011115610f24575f5ffd5b959894975092955050506020019190565b5f5f60408385031215610f46575f5ffd5b610f4f83610d06565b9150610f5d60208401610d06565b90509250929050565b600181811c90821680610f7a57607f821691505b602082108103610f9857634e487b7160e01b5f52602260045260245ffd5b50919050565b5f60208284031215610fae575f5ffd5b8151610cb381610e5e565b5f60018201610fd657634e487b7160e01b5f52601160045260245ffd5b5060010190565b601f821115610639578282111561063957805f5260205f20601f840160051c602085101561100857505f5b90810190601f840160051c035f5b81811015610a4a575f83820155600101611016565b815167ffffffffffffffff81111561104557611045610d97565b611059816110538454610f66565b84610fdd565b6020601f82116001811461108b575f83156110745750848201515b5f19600385901b1c1916600184901b17845561085f565b5f84815260208120601f198516915b828110156110ba578785015182556020948501946001909201910161109a565b50848210156110d757868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b5f81546110f281610f66565b600182168015611109576001811461111e5761114b565b60ff198316865281151582028601935061114b565b845f5260205f205f5b8381101561114357815488820152600190910190602001611127565b505081860193505b50505092915050565b5f81518060208401855e5f93019283525090919050565b693d913730b6b2911d101160b11b81525f611189600a8301876110e6565b61202360f01b815261119e6002820187611154565b72111610113232b9b1b934b83a34b7b7111d101160691b815290506111c660138201866110e6565b6c1116101134b6b0b3b2911d101160991b815290506111e8600d8201856110e6565b61227d60f01b8152600201979650505050505050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c00000081525f610cb3601d83018461115456" as const;
