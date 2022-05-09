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

interface IQAZDescriptor {
    function getSpell(uint256 tokenId) external pure returns (string memory);

    function getElement(uint256 tokenId) external pure returns (string memory);

    function getPower(uint256 tokenId) external pure returns (string memory);

    function getSpeed(uint256 tokenId) external pure returns (string memory);

    function getAccuracy(uint256 tokenId) external pure returns (string memory);

    function getRange(uint256 tokenId) external pure returns (string memory);

    function getCost(uint256 tokenId) external pure returns (string memory);

    function getLuck(uint256 tokenId) external pure returns (string memory);

    function tokenURI(uint256 tokenId) external pure returns (string memory);
}
