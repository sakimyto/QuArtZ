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

import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IQAZDescriptor.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {NFTDescriptor} from "./libs/NFTDescriptor.sol";
import {QAZElementer} from "./libs/QAZElementer.sol";

contract QAZDescriptor is IQAZDescriptor {
    using Strings for uint256;

    function getSpell(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return QAZElementer.getSpell(tokenId);
    }

    function getElement(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return QAZElementer.getElement(tokenId);
    }

    function genParam(string memory input, uint256 tokenId)
        public
        pure
        returns (string memory)
    {
        return
            (uint256(
                keccak256(
                    abi.encodePacked(
                        string(abi.encodePacked(input, tokenId.toString()))
                    )
                )
            ) % 32).toString();
    }

    function getPower(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return genParam("power", tokenId);
    }

    function getSpeed(uint256 tokenId) public pure returns (string memory) {
        return genParam("speed", tokenId);
    }

    function getAccuracy(uint256 tokenId) public pure returns (string memory) {
        return genParam("accuracy", tokenId);
    }

    function getRange(uint256 tokenId) public pure returns (string memory) {
        return genParam("range", tokenId);
    }

    function getCost(uint256 tokenId) public pure returns (string memory) {
        return genParam("cost", tokenId);
    }

    function getLuck(uint256 tokenId) public pure returns (string memory) {
        return genParam("luck", tokenId);
    }

    function _buildAttributes(
        string memory ret,
        string memory attribute,
        string memory value,
        bool isInt
    ) internal pure returns (string memory) {
        if (isInt) {
            return
                string(
                    abi.encodePacked(
                        ret,
                        '{"trait_type": "',
                        attribute,
                        '","value": ',
                        value,
                        "}"
                    )
                );
        } else {
            return
                string(
                    abi.encodePacked(
                        ret,
                        '{"trait_type": "',
                        attribute,
                        '","value": "',
                        value,
                        '"}'
                    )
                );
        }
    }

    function _genAttributes(uint256 tokenId)
        internal
        pure
        returns (string memory)
    {
        string memory ret = "";
        ret = _buildAttributes(ret, "spell", getSpell(tokenId), false);
        ret = string(abi.encodePacked(ret, ","));
        ret = _buildAttributes(ret, "element", getElement(tokenId), false);
        ret = string(abi.encodePacked(ret, ","));
        ret = _buildAttributes(ret, "power", getPower(tokenId), true);
        ret = string(abi.encodePacked(ret, ","));
        ret = _buildAttributes(ret, "speed", getSpeed(tokenId), true);
        ret = string(abi.encodePacked(ret, ","));
        ret = _buildAttributes(ret, "accuracy", getAccuracy(tokenId), true);
        ret = string(abi.encodePacked(ret, ","));
        ret = _buildAttributes(ret, "range", getRange(tokenId), true);
        ret = string(abi.encodePacked(ret, ","));
        ret = _buildAttributes(ret, "cost", getCost(tokenId), true);
        ret = string(abi.encodePacked(ret, ","));
        ret = _buildAttributes(ret, "luck", getLuck(tokenId), true);
        return ret;
    }

    function tokenURI(uint256 tokenId)
        external
        pure
        override
        returns (string memory)
    {
        NFTDescriptor.TokenURIParams memory params = NFTDescriptor
            .TokenURIParams({
                name: string(
                    abi.encodePacked(
                        getSpell(tokenId),
                        " #",
                        tokenId.toString()
                    )
                ),
                description: "QuArtZ is full-on-chain magic spell protocol, that is generated randomly and stored with attributes on Aster Network.",
                attributes: _genAttributes(tokenId),
                image: QAZElementer.getImage(tokenId)
            });
        return NFTDescriptor.constructTokenURI(params);
    }
}
