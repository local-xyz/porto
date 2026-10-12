export const abi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_l0SettlerSigner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "allowInitializePath",
    "inputs": [
      {
        "name": "_origin",
        "type": "tuple",
        "internalType": "struct Origin",
        "components": [
          {
            "name": "srcEid",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "sender",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "nonce",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "assignJob",
    "inputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "computeExecuteSendDigest",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "settlementId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "settlerContext",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "eip712Domain",
    "inputs": [],
    "outputs": [
      {
        "name": "fields",
        "type": "bytes1",
        "internalType": "bytes1"
      },
      {
        "name": "name",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "version",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "chainId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verifyingContract",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "salt",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "extensions",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "endpoint",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract ILayerZeroEndpointV2"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "executeSend",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "settlementId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "settlerContext",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "signature",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getFee",
    "inputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "isComposeMsgSender",
    "inputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct Origin",
        "components": [
          {
            "name": "srcEid",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "sender",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "nonce",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      },
      {
        "name": "",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "_sender",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "l0SettlerSigner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "lzReceive",
    "inputs": [
      {
        "name": "_origin",
        "type": "tuple",
        "internalType": "struct Origin",
        "components": [
          {
            "name": "srcEid",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "sender",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "nonce",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      },
      {
        "name": "_guid",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "_message",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "_executor",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_extraData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "nextNonce",
    "inputs": [
      {
        "name": "",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "nonce",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "oAppVersion",
    "inputs": [],
    "outputs": [
      {
        "name": "senderVersion",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "receiverVersion",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "peers",
    "inputs": [
      {
        "name": "_eid",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [
      {
        "name": "peer",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "read",
    "inputs": [
      {
        "name": "settlementId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "chainId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "isSettled",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "send",
    "inputs": [
      {
        "name": "settlementId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "settlerContext",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "setDelegate",
    "inputs": [
      {
        "name": "_delegate",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setEndpoint",
    "inputs": [
      {
        "name": "_endpoint",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setL0SettlerSigner",
    "inputs": [
      {
        "name": "newL0SettlerSigner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setPeer",
    "inputs": [
      {
        "name": "_eid",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "_peer",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "settled",
    "inputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
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
    "stateMutability": "view"
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
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "validSend",
    "inputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "token",
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
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
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
    "name": "PeerSet",
    "inputs": [
      {
        "name": "eid",
        "type": "uint32",
        "indexed": false,
        "internalType": "uint32"
      },
      {
        "name": "peer",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Settled",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "settlementId",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "senderChainId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "InsufficientFee",
    "inputs": [
      {
        "name": "provided",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "required",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidDelegate",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidEndpointCall",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidEndpointId",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidL0SettlerSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidSettlementId",
    "inputs": []
  },
  {
    "type": "error",
    "name": "LzTokenUnavailable",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NoPeer",
    "inputs": [
      {
        "name": "eid",
        "type": "uint32",
        "internalType": "uint32"
      }
    ]
  },
  {
    "type": "error",
    "name": "NotEnoughNative",
    "inputs": [
      {
        "name": "msgValue",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "OnlyEndpoint",
    "inputs": [
      {
        "name": "addr",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OnlyPeer",
    "inputs": [
      {
        "name": "eid",
        "type": "uint32",
        "internalType": "uint32"
      },
      {
        "name": "sender",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "SafeERC20FailedOperation",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
] as const;

export const code = "0x610120604052348015610010575f5ffd5b50604051611bd2380380611bd283398101604081905261002f916101e2565b8180806001600160a01b03811661005f57604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b61006881610178565b506001600160a01b03811661009057604051632d618d8160e21b815260040160405180910390fd5b61009981610178565b5050306080524660a0526060806100ef604080518082018252601081526f2630bcb2b92d32b937a9b2ba3a3632b960811b60208083019190915282518084019093526005835264302e312e3160d81b9083015291565b815160209283012081519183019190912060c082905260e0819052604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8152938401929092529082015246606082015230608082015260a09020610100525050600580546001600160a01b0319166001600160a01b039290921691909117905550610213565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146101dd575f5ffd5b919050565b5f5f604083850312156101f3575f5ffd5b6101fc836101c7565b915061020a602084016101c7565b90509250929050565b60805160a05160c05160e051610100516119826102505f395f610e8601525f610f4001525f610f1a01525f610eca01525f610ea701526119825ff3fe608060405260043610610164575f3560e01c80637d25a05e116100cd578063bb0b6a5311610087578063dbbb415511610062578063dbbb41551461044d578063f2fde38b1461046c578063ff7bd03d1461048b578063ffe3c8eb146104aa575f5ffd5b8063bb0b6a53146103f0578063ca5eb5e11461040f578063d9caed121461042e575f5ffd5b80637d25a05e146103085780638069edd21461034157806382413eac1461036057806384b0196e1461038e57806386f2a60d146103b55780638da5cb5b146103d4575f5ffd5b80635e280f111161011e5780635e280f111461021e578063665749dd146102555780636f0e1a9a14610294578063709eb664146102c2578063715018a6146102f4578063717e8a42146102c2575f5ffd5b806313137d651461016f57806317442b70146101845780633400288b146101aa57806347e98ff7146101c95780634fdf7085146101dc578063586a6094146101ef575f5ffd5b3661016b57005b5f5ffd5b61018261017d366004611227565b6104c9565b005b34801561018f575f5ffd5b50604080516001815260026020820152015b60405180910390f35b3480156101b5575f5ffd5b506101826101c43660046112d9565b610566565b6101826101d7366004611301565b61057c565b6101826101ea36600461138a565b610791565b3480156101fa575f5ffd5b5061020e6102093660046113d1565b6107e5565b60405190151581526020016101a1565b348015610229575f5ffd5b5060015461023d906001600160a01b031681565b6040516001600160a01b0390911681526020016101a1565b348015610260575f5ffd5b5061020e61026f3660046113d1565b600360209081525f938452604080852082529284528284209052825290205460ff1681565b34801561029f575f5ffd5b5061020e6102ae366004611406565b60046020525f908152604090205460ff1681565b3480156102cd575f5ffd5b506102e66102dc36600461141d565b5f95945050505050565b6040519081526020016101a1565b3480156102ff575f5ffd5b5061018261081a565b348015610313575f5ffd5b506103296103223660046112d9565b5f92915050565b6040516001600160401b0390911681526020016101a1565b34801561034c575f5ffd5b506102e661035b3660046114cc565b61082d565b34801561036b575f5ffd5b5061020e61037a366004611579565b6001600160a01b0381163014949350505050565b348015610399575f5ffd5b506103a26108b1565b6040516101a19796959493929190611609565b3480156103c0575f5ffd5b5060055461023d906001600160a01b031681565b3480156103df575f5ffd5b505f546001600160a01b031661023d565b3480156103fb575f5ffd5b506102e661040a36600461169f565b503090565b34801561041a575f5ffd5b506101826104293660046116b8565b610918565b348015610439575f5ffd5b506101826104483660046116d3565b6109a7565b348015610458575f5ffd5b506101826104673660046116b8565b6109bf565b348015610477575f5ffd5b506101826104863660046116b8565b610a2d565b348015610496575f5ffd5b5061020e6104a5366004611700565b610a6a565b3480156104b5575f5ffd5b506101826104c43660046116b8565b610a8b565b6001546001600160a01b031633146104fb576040516391ac5e4f60e01b81523360048201526024015b60405180910390fd5b602087018035906105109061040a908a61169f565b1461054e57610522602088018861169f565b60405163309afaf360e21b815263ffffffff9091166004820152602088013560248201526044016104f2565b61055d87878787878787610ab5565b50505050505050565b61056e610b4b565b6105788282610b77565b5050565b5f86868686604051602001610594949392919061171a565b60408051601f1981840301815291815281516020928301205f818152600490935291205490915060ff166105db57604051630523e26360e11b815260040160405180910390fd5b5f61061c888888888080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201919091525061082d92505050565b600554604080516020601f880181900481028201810190925286815292935061066c926001600160a01b0390921691849188908890819084018382808284375f92019190915250610bcb92505050565b61068957604051633d7bbe2360e01b815260040160405180910390fd5b5f828152600460205260408120805460ff191690556106aa86880188611761565b60408051602081018b90526001600160a01b038c16918101919091524660608201529091505f9060800160408051601f1981840301815282820190915260028252600360f01b602083015291505f5b8351811015610783575f84828151811061071557610715611803565b602002602001015190508063ffffffff165f0361074557604051637dbc055960e11b815260040160405180910390fd5b5f6107528286865f610ca8565b90506107788286866040518060400160405280865f015181526020015f81525033610d62565b5050506001016106f9565b505050505050505050505050565b600160045f338686866040516020016107ad949392919061171a565b60408051808303601f190181529181528151602092830120835290820192909252015f20805460ff1916911515919091179055505050565b5f8381526003602090815260408083206001600160a01b0386168452825280832084845290915290205460ff165b9392505050565b610822610b4b565b61082b5f610e35565b565b5f6108a97f868cb391c50a3311dbd1a7d91a9d3f79813b9dc47fbdfa4598dc0070a3b3ab518585858051906020012060405160200161088e94939291909384526001600160a01b039290921660208401526040830152606082015260800190565b60405160208183030381529060405280519060200120610e84565b949350505050565b600f60f81b6060805f808083610906604080518082018252601081526f2630bcb2b92d32b937a9b2ba3a3632b960811b60208083019190915282518084019093526005835264302e312e3160d81b9083015291565b97989097965046955030945091925090565b610920610b4b565b6001546001600160a01b031661094957604051632d618d8160e21b815260040160405180910390fd5b60015460405163ca5eb5e160e01b81526001600160a01b0383811660048301529091169063ca5eb5e1906024015b5f604051808303815f87803b15801561098e575f5ffd5b505af11580156109a0573d5f5f3e3d5ffd5b5050505050565b6109af610b4b565b6109ba838383610f9a565b505050565b6109c7610b4b565b6001600160a01b0381166109ee57604051632d618d8160e21b815260040160405180910390fd5b600180546001600160a01b0319166001600160a01b03831690811790915560405163ca5eb5e160e01b815233600482015263ca5eb5e190602401610977565b610a35610b4b565b6001600160a01b038116610a5e57604051631e4fbdf760e01b81525f60048201526024016104f2565b610a6781610e35565b50565b5f80610a7c61040a602085018561169f565b60209093013590921492915050565b610a93610b4b565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b5f8080610ac4878901896113d1565b5f8381526003602090815260408083206001600160a01b03861680855290835281842085855290925291829020805460ff191660011790559051939650919450925084917f8ec0095f0a0abbc8db397cd5246942293ac1a755825eba51c0ca828ec2102b6490610b379085815260200190565b60405180910390a350505050505050505050565b5f546001600160a01b0316331461082b5760405163118cdaa760e01b81523360048201526024016104f2565b63ffffffff82165f81815260026020908152604091829020849055815192835282018390527f238399d427b947898edb290f5ff0f9109849b1c3ba196a42e35f00c50a54b98b910160405180910390a15050565b5f6001600160a01b0384161561081357604051843b610c6057825160408114610bfc5760418114610c1d5750610ca0565b604084015160ff81901c601b016020526001600160ff1b0316606052610c30565b60608401515f1a60205260408401516060525b50835f5260208301516040526020600160805f60015afa5180861860601b3d119250505f60605280604052610ca0565b631626ba7e60e01b808252846004830152602482016040815284516020018060448501828860045afa905060208260443d01868b5afa9151911691141691505b509392505050565b6040805180820182525f808252602080830191909152600154835160a08101855263ffffffff89168152309281018390528085018890526060810187905285151560808201529351631bb8518b60e31b815292936001600160a01b039091169263ddc28c5892610d1b9291600401611817565b6040805180830381865afa158015610d35573d5f5f3e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610d5991906118db565b95945050505050565b610d6a611179565b8251602084015115610d8357610d838460200151610fbd565b6001546040805160a08101825263ffffffff8a168152306020808301919091528183018a9052606082018990528701511515608082015290516302637a4560e41b81526001600160a01b0390921691632637a450918491610de991908890600401611817565b60806040518083038185885af1158015610e05573d5f5f3e3d5ffd5b50505050506040513d601f19601f82011682018060405250810190610e2a91906118f5565b979650505050505050565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b7f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000030147f0000000000000000000000000000000000000000000000000000000000000000461416610f775750604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81527f000000000000000000000000000000000000000000000000000000000000000060208201527f00000000000000000000000000000000000000000000000000000000000000009181019190915246606082015230608082015260a090205b6719010000000000005f5280601a5281603a52604260182090505f603a52919050565b6001600160a01b038316610fb2576109ba828261106d565b6109ba838383611086565b6001546040805163393f876560e21b815290515f926001600160a01b03169163e4fe1d949160048083019260209291908290030181865afa158015611004573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906110289190611967565b90506001600160a01b038116611051576040516329b99a9560e11b815260040160405180910390fd5b600154610578906001600160a01b0383811691339116856110d0565b5f385f3884865af16105785763b12d13eb5f526004601cfd5b816014528060345263a9059cbb60601b5f5260205f604460105f875af18060015f5114166110c657803d853b1517106110c6576390b8ec185f526004601cfd5b505f603452505050565b6110de84848484600161110c565b61110657604051635274afe760e01b81526001600160a01b03851660048201526024016104f2565b50505050565b6040516323b872dd60e01b5f8181526001600160a01b038781166004528616602452604485905291602083606481808c5af1925060015f5114831661116857838315161561115c573d5f823e3d81fd5b5f883b113d1516831692505b604052505f60605295945050505050565b60405180606001604052805f81526020015f6001600160401b031681526020016111b460405180604001604052805f81526020015f81525090565b905290565b5f606082840312156111c9575f5ffd5b50919050565b5f5f83601f8401126111df575f5ffd5b5081356001600160401b038111156111f5575f5ffd5b60208301915083602082850101111561120c575f5ffd5b9250929050565b6001600160a01b0381168114610a67575f5ffd5b5f5f5f5f5f5f5f60e0888a03121561123d575f5ffd5b61124789896111b9565b96506060880135955060808801356001600160401b03811115611268575f5ffd5b6112748a828b016111cf565b90965094505060a088013561128881611213565b925060c08801356001600160401b038111156112a2575f5ffd5b6112ae8a828b016111cf565b989b979a50959850939692959293505050565b803563ffffffff811681146112d4575f5ffd5b919050565b5f5f604083850312156112ea575f5ffd5b6112f3836112c1565b946020939093013593505050565b5f5f5f5f5f5f60808789031215611316575f5ffd5b863561132181611213565b95506020870135945060408701356001600160401b03811115611342575f5ffd5b61134e89828a016111cf565b90955093505060608701356001600160401b0381111561136c575f5ffd5b61137889828a016111cf565b979a9699509497509295939492505050565b5f5f5f6040848603121561139c575f5ffd5b8335925060208401356001600160401b038111156113b8575f5ffd5b6113c4868287016111cf565b9497909650939450505050565b5f5f5f606084860312156113e3575f5ffd5b8335925060208401356113f581611213565b929592945050506040919091013590565b5f60208284031215611416575f5ffd5b5035919050565b5f5f5f5f5f60808688031215611431575f5ffd5b61143a866112c1565b9450602086013561144a81611213565b93506040860135925060608601356001600160401b0381111561146b575f5ffd5b611477888289016111cf565b969995985093965092949392505050565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f191681016001600160401b03811182821017156114c4576114c4611488565b604052919050565b5f5f5f606084860312156114de575f5ffd5b83356114e981611213565b92506020840135915060408401356001600160401b0381111561150a575f5ffd5b8401601f8101861361151a575f5ffd5b80356001600160401b0381111561153357611533611488565b611546601f8201601f191660200161149c565b81815287602083850101111561155a575f5ffd5b816020840160208301375f602083830101528093505050509250925092565b5f5f5f5f60a0858703121561158c575f5ffd5b61159686866111b9565b935060608501356001600160401b038111156115b0575f5ffd5b6115bc878288016111cf565b90945092505060808501356115d081611213565b939692955090935050565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b60ff60f81b8816815260e060208201525f61162760e08301896115db565b828103604084015261163981896115db565b606084018890526001600160a01b038716608085015260a0840186905283810360c0850152845180825260208087019350909101905f5b8181101561168e578351835260209384019390920191600101611670565b50909b9a5050505050505050505050565b5f602082840312156116af575f5ffd5b610813826112c1565b5f602082840312156116c8575f5ffd5b813561081381611213565b5f5f5f606084860312156116e5575f5ffd5b83356116f081611213565b925060208401356113f581611213565b5f60608284031215611710575f5ffd5b61081383836111b9565b6001600160a01b0385168152602081018490526060604082018190528101829052818360808301375f818301608090810191909152601f909201601f191601019392505050565b5f60208284031215611771575f5ffd5b81356001600160401b03811115611786575f5ffd5b8201601f81018413611796575f5ffd5b80356001600160401b038111156117af576117af611488565b8060051b6117bf6020820161149c565b918252602081840181019290810190878411156117da575f5ffd5b6020850194505b83851015610e2a576117f2856112c1565b8252602094850194909101906117e1565b634e487b7160e01b5f52603260045260245ffd5b6040815263ffffffff8351166040820152602083015160608201525f604084015160a0608084015261184c60e08401826115db565b90506060850151603f198483030160a085015261186982826115db565b60809690960151151560c08501525050506001600160a01b039190911660209091015290565b5f6040828403121561189f575f5ffd5b604080519081016001600160401b03811182821017156118c1576118c1611488565b604052825181526020928301519281019290925250919050565b5f604082840312156118eb575f5ffd5b610813838361188f565b5f6080828403128015611906575f5ffd5b50604051606081016001600160401b038111828210171561192957611929611488565b6040528251815260208301516001600160401b0381168114611949575f5ffd5b602082015261195b846040850161188f565b60408201529392505050565b5f60208284031215611977575f5ffd5b81516108138161121356" as const;
