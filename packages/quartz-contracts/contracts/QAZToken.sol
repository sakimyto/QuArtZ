// SPDX-License-Identifier: CC0

/***********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░██▒░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░████▒░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░████████▒░░░░░░░░░░░ *
 * ░░░░░░░░░░██████████▒░░░░░░░░░░ *
 * ░░░░░░░░░████████████▒░░░░░░░░░ *
 * ░░░░░░░░░░██████████▒░░░░░░░░░░ *
 * ░░░░░░░░░░░████████▒░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░████▒░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░██▒░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 ***********************************/

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {IQAZDescriptor} from "./interfaces/IQAZDescriptor.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract QAZToken is ReentrancyGuard, Ownable, ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;

    // The internal token ID tracker
    Counters.Counter private _tokenId;

    // The QuArtZ collection Attributes
    string public collectionName;
    string public collectionSymbol;

    // The QuArtZ token URI descriptor
    IQAZDescriptor public descriptor;

    // The internal last minted time
    uint256 private _last77MintedAt;

    /**
     * @notice mintable 77 per 77 hours.
     */
    modifier whenIsMintable() {
        require(
            _last77MintedAt < block.timestamp - 77 hours,
            "Mint is locked now."
        );
        _;
    }

    constructor(IQAZDescriptor _descriptor) ERC721("QuArtZ", "QAZ") Ownable() {
        collectionName = name();
        collectionSymbol = symbol();
        descriptor = _descriptor;
        _last77MintedAt = block.timestamp - 77 hours;
    }

    /**
     * @notice Set the token URI descriptor.
     * @dev Only callable by the owner.
     */
    function setDescriptor(IQAZDescriptor _descriptor) external onlyOwner {
        descriptor = _descriptor;
    }

    /**
     * @notice A distinct Uniform Resource Identifier (URI) for a given asset.
     * @dev See {QAZDescriptor}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return descriptor.tokenURI(tokenId);
    }

    /**
     * @notice Mint a QuArtZ NFT. use just a little more in mod77=0 for updating interval
     */
    function mint() public nonReentrant whenIsMintable returns (uint256) {
        uint256 newTokenId = _tokenId.current();

        string memory finalTokenURI = tokenURI(newTokenId);

        _safeMint(_msgSender(), newTokenId);
        _setTokenURI(newTokenId, finalTokenURI);

        if (newTokenId % 77 == 0) {
            _last77MintedAt = block.timestamp;
        }
        _tokenId.increment();

        return newTokenId;
    }

    /**
     * @dev Returns current token id as the total amount of tokens by the contract.
     */
    function totalSupply() public view returns (uint256) {
        return _tokenId.current();
    }

    /**
     * @notice Returns _last77MintedAt variable.
     */
    function last77MintedAt() public view returns (uint256) {
        return _last77MintedAt;
    }
}
