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
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

library QAZElementer {
    using Strings for uint256;

    /**
     * @notice Given a tokenId, generate the number of available Element
     */
    function _genElementNum(uint256 tokenId) public pure returns (uint256) {
        uint256 rand = uint256(
            keccak256(
                abi.encodePacked(
                    string(abi.encodePacked("element", tokenId.toString()))
                )
            )
        );
        return rand % 7;
    }

    /**
     * @notice Given a tokenId, get the element name
     */
    function getElement(uint256 tokenId) public pure returns (string memory) {
        string[7] memory elements = [
            "Blizzard",
            "Dark",
            "Fire",
            "Lightning",
            "Holy",
            "Water",
            "Wind"
        ];
        return elements[_genElementNum(tokenId)];
    }

    /**
     * @notice Given a tokenId, get the spell name
       @dev use mod 7 for getting that corresponding to the element
     */
    function getSpell(uint256 tokenId) public pure returns (string memory) {
        string[210] memory spells = [
            "Absolute Zero",
            "Anti Spell",
            "Blaze",
            "Blitz",
            "Aegis Shield",
            "Acid",
            "Aero",
            "Avalanche",
            "Black Arrow",
            "Bomb",
            "Blitz Whip",
            "Angel Whisper",
            "Acid Fog",
            "Air Knife",
            "Blizzard",
            "Confuse",
            "Burn",
            "Bolt Ball",
            "Astral Wave",
            "Acid Rain",
            "Wind Spear",
            "Blizzard Slash",
            "Curse",
            "Burning Fist",
            "Diffractive Laser",
            "Auto Life",
            "Aqua",
            "Desertstorm",
            "Cold Mist",
            "Dark Mist",
            "Chaos Flame",
            "Electric Blade",
            "Cure",
            "Aqua Beam",
            "Dust",
            "Cold Rain",
            "Daze",
            "Dark Flare",
            "Electric Burst",
            "Exorcise",
            "Aqua Shooter",
            "Gale Cut",
            "Diamond Dust",
            "Death",
            "Fire Arrow",
            "Electrocute",
            "Full Life",
            "Aqua Shot",
            "Gust",
            "Flash Rain",
            "Death's Shadow",
            "Fire Ball",
            "Paralyze",
            "Grand Cross",
            "Aqua Slash",
            "Rage",
            "Freeze",
            "Deprotect",
            "Fire Beam",
            "Flash",
            "Heal",
            "Aqua Whip",
            "Sonic Boom",
            "Freeze Fist",
            "Deshell",
            "Fire Burst",
            "Gigavolt",
            "Holy",
            "Blind Mist",
            "Hurricane",
            "Freezing Dust",
            "Disfigure",
            "Fire Ring",
            "Judgment Bolt",
            "Holy Arrows",
            "Cure Water",
            "Breath Wing",
            "Frost Blast",
            "Dispel",
            "Firestorm",
            "Lightning",
            "Holy Blade",
            "Flash Flood",
            "Wind Slash",
            "Ice",
            "Fog",
            "Flame",
            "Lightning Arrow",
            "Holy Lance",
            "Flood",
            "Wind Male",
            "Ice Armor",
            "Hypnosis",
            "Flame Claws",
            "Mega Spark",
            "Holy Nova",
            "Nymph",
            "Razor Gale",
            "Ice Arrow",
            "Imperil",
            "Flame Lance",
            "Plasma Arrow",
            "Holy Ray",
            "Spiral Water",
            "Sandstorm",
            "Ice Ball",
            "Jinx",
            "Flame Mail",
            "Plasma Shield",
            "Holy Shield",
            "Tidal Wave",
            "Air Bomb",
            "Ice Beam",
            "Meteor",
            "Flame Shield",
            "Shock Wave",
            "Life",
            "Water",
            "Tornado",
            "Ice Breath",
            "Meteor Shower",
            "Flame Shot",
            "Shockstorm",
            "Null All",
            "Water Arrow",
            "Typhoon",
            "Ice Claws",
            "Nightmare",
            "Flame Slash",
            "Spark",
            "Null Blaze",
            "Water Ball",
            "Wind Blast",
            "Ice Fang",
            "Pain",
            "Flame Blade",
            "Thor's Hammer",
            "Null Frost",
            "Water Blade",
            "Twister",
            "Ice Lance",
            "Poison",
            "Flame Whip",
            "Thunder",
            "Null Paralysis",
            "Water Burst",
            "Wind",
            "Ice Mail",
            "Psyco Wave",
            "Flare",
            "Thunder Beam",
            "Null Poison",
            "Water Cannon",
            "Wind Armor",
            "Ice Pillar",
            "Screech",
            "Heat Ray",
            "Thunder Blade",
            "Null Shock",
            "Water Jet",
            "Wind Arrow",
            "Ice Prism",
            "Shadow Cloak",
            "Ifrit",
            "Thunder Claws",
            "Null Sleep",
            "Water Lance",
            "Wind Mail",
            "Ice Ring",
            "Shadow Edge",
            "Jet Fire",
            "Thunder Lance",
            "Reincarnate",
            "Water Mail",
            "Wind Shield",
            "Ice Shield",
            "Shadow Sneak",
            "Magma Breath",
            "Thunder Mail",
            "Resurrect",
            "Water Ray",
            "Air Blade",
            "Ice Shot",
            "Shadow Strike",
            "Pyrohelix",
            "Thunder Whip",
            "Sacrid Rain",
            "Water Ring",
            "Cyclone",
            "Icestorm",
            "Slow",
            "Dragon Breath",
            "Thunderbolt",
            "Saint Cross",
            "Water Shield",
            "Tempest",
            "Ice Sword",
            "Collapse",
            "Spiral Flame",
            "Thunderstorm",
            "Shining Ray",
            "Water Shock",
            "Aerial Slash",
            "Snowstorm",
            "Eclipse",
            "Will O' Wisp",
            "Tunder Ball",
            "Vanish",
            "Waterstorm",
            "Sonic Wings"
        ];

        return
            spells[
                ((uint256(
                    keccak256(
                        abi.encodePacked(
                            string(
                                abi.encodePacked("spell", tokenId.toString())
                            )
                        )
                    )
                ) % 30) * 7) + _genElementNum(tokenId)
            ];
    }

    /**
     * @notice Given a tokenId, get the element image encoded to a base64 data
     */
    function getImage(uint256 tokenId) public pure returns (string memory) {
        string[7] memory quartz = [
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeBAMAAAA/BWopAAAAMFBMVEURERHCz/+XtP9YXdtHRb9QTrVUV81SUr80M20pKE9iZ8cZGSW0v/ZzdswtK1mFm+08mGYWAAAB0klEQVR42u3b0WnCUBSA4ayQFVxBcAKzgU5Q0A3sCl2hK3SFrtAVukJXaM8FhRASRdrEe2+/z5dCH/w5aE85kKYBAAAAAAAAAAAAAAAAgH9kH/Tq1atX77LasD/Tq1evXr3LeA/t2Tro1atXr97ldkW/9xD0zth7Km2+R/Oddb4n37c5e4/59qb/z4e9Oe8MvXr16q2ltx1Y9+jVq1ev3mVah7253a716tWrt4be13CrN6edoVevXr219LYT0m2935vLrX2yd/NUVm8ElzXfQ2nz3Ziv+eY83+GNui/9LredoVevXr219LZXfIT1CL169erVO1/r1M3kkbdrvXr16q2lN73vZ7inN91M9OrVq1fv73tXIy7PSqfe55B+3vY88rajV69evTX0JqsbtiP06tWrd7S3M997vIR7epsH06tXr95aeq/tjO/Qb83lmRG9evXqraV3qjmnO4levXr11to7drvOtVWvXr16a+od2xml9u5CUfPtyppvF6+i5rvblfX5LWy+Xefv2V/4CmO9Tab06tWrt5be4c7I7UatV69evTX39ptz3xV69erVW1tv2hFvoSmEXr169dbSe2nWq1evXr0AAAAAAAAAAAAAAEDFfgBOLOtQmkZMSQAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeBAMAAAA/BWopAAAAIVBMVEURERHv+f+22f92te9ZmtSAHwB2e5WQUkREFwnh3t+oq7+1vBDqAAACJUlEQVR42u3bQWoiQRSA4V72tq+QK3gF6cXsQ3KApgUPoFm6EXOF7AcXc8qpghGaRscJGbVe5fuzEVzk8/FMQZFuGkmSJEmSJEmSJEmSJEmSJEmSJEmSvlHPKV5eXl7e+9alnv/Ey8vLy3tfb26RKh672+0iedto821izXfXxppvm35C7UMbbX9jebtJ2TtuVmMk7yqBQ3lXseY7bsZNsPnG2ocx2j5szPc/3pHMvSWfGby8vLy1eLtZi0m8vLy8vPexzr2l3V3z8vLy1uB9T13zlnRm8N7a28bytvaBN663u9CQmnrHVMne/ng8RvKu+74PNd9hPcSa7891JO8wjLH24fhjMN+vNb+jnpbfK+3M4OXl5a3F2/2lj9TiTLy8vLy8t7NeujN55N01Ly8vby3e/Hu3qc94850JLy8vL+/XvU9nOj0rnb358+TXy0mPvNu56j28vITyBpvv2/ZwCDXft2jz3ZrvN/m+5Z6utJw39KG8/XIYInmHYPPN4FDz7YPtb1pg+3DLvw+PnW/+X7nPeJsHF82737+/mu8Nvftg+5DA9oH3X86MX6mptZRnRnh5eXlr8V4yl3RPwsvLy1ur99zddalWXl5e3pq8586Mk7WU5wp5eXl5a/XO765LPit4eXl5a/LOz4zS7qh5eXl5a/ZOzaWfFby8vLy1eU/P8TVB4uXl5a3FezLz8vLy8kqSJEmSJEmSJEmSJEmSJEmSpIr7DSvDqin+aIeKAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeCAMAAAD69YcoAAAANlBMVEURERHKU1O8SEi/UFC/RUW1Tk7PVVX/wsL/l5fbWFjHYGAlGRnthIRPKCjMcnJZKyttMzP2tLR20NuJAAACRklEQVR42u3dy2oCQRBA0TFqdMz7/39WkOrNJM10ImP6cY47QzaXQqih0GkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgCseghLzyIq+88iKvvD06heOCMvLKK6+88sqLvPL24CWcFuagkLzyyiuvvPIir7w9rRO5vLuglLzyyiuvvPJSlncvr+mtSnpcvpbXeiGvvPLKK6+8yCtvj+tELq/M8sorr7zyyiuvvPL2lHUtr7NqeeWVV1555ZVXXnlr9hbuzWu9kFdeeeWVV1555ZW3h3UieQ65vOnvysrbYN7d7SXvn/POptf0+uyV9+e8s+k1vf9p7Uw6J/2f9UJeeeWVV1555ZVX3h7XieQrzIXklVdeeeWVV1555ZW3pay/PScZ9KxaXnnllVdeeeWVV97KHqO/h63ypq9PlneTvHEMJa/pNb3yml7Ta3rlNb1rec+Flj//nPLuQ3r/kDHY43R55ZVXXnnllVdeeStzvtOhkLzb5H26veQ1vaZXXtNrek2vvPKu+Qxb5Z3GJq+88sorr7zyyitv4+vFa8hl9fMg8sorr7zyyiuvvPL2kNnZiLzyyiuvvPIir7wtKz2rllVeeeWVV155kVfeEdaLbzf+QTl55ZVXXnnllVdeeVvyEUrzKiavvPLKK6+88sorb4/rhTNpeeWVV1555UVeeUfIbJ2QV17klVde5JW3R2l9uARF5JUXeeWVF3nlHSGzEvLKi7zyyou88gIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9yBfW6Z+kLky0wAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeCAMAAAD69YcoAAAANlBMVEURERG4v1Dp7YTBx2C9v0WttU7IzVT+/8L9/5fY21jGzHL09rRpbTMlJRlLTyjCyFNVWSvN0VZ+NbUoAAACU0lEQVR42u3d3WrCQBCA0WybVO1/3/9lW8kshdCQFNk2u3sO5kbw5mNRJ4w4DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzCFJSQV17klVde5JW3RacwLSgjr7zyyiuvvMgrbwtewmnhEhSSV1555ZVXXuSVt6VxYi3vW1BKXnnllVdeeZFX3hrl2+VbeY0X8sorr7zyyou88rY4TqzllVleeeWVV1555ZVX3paybuW1Vi2vvPLKK6+88sor75G9hlvzGi/klVdeeeWVV1555W1hnMg+wlreh6CsvPLKK6+88sorr7xHsLUmvSa/znghr7zyyiuvvPLKK2+L40T2FC47ySuvvPLKK6+88sorb01Zf7tO0ulatbzyyiuvvPLKK6+8B7uN/hhK5c3rJPLKK6+88sorr7zyyvufec87Lf/+OedNIT8/rujsdrq88sorr7zyyiuvvAdzvtG4k7zyVpk3yev0Vpo3zZe8Tq/3Xnmd3m/PoVTeoW/yyiuvvPLKK6+88lY+XtyFtaz+HkReeeWVV1555ZVX3hYyWxuRV1555ZVXXuSVt2Z716pllVdeeeWVV17klbeH8eKHHfTU8W8oiuedro8kb6G8175fl3JF8k5pvpRzeqv8aHN6y+VN4+SLWck3h/n3gcrt8h725lVMXnnllVdeeeWVV94Wxwtr0vLKK6+88sqLvPL2kNk4Ia+8yCuvvMgrb4vy+HAfFJFXXuSVV17klbeHzErIKy/yyisv8soLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8kU+xr2hwoi801QAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeCAMAAAD69YcoAAAAOVBMVEURERFup9ovLy/d7ftZmtX////t9v/v+f+22f92te+62veZx/Oq0PWp0PVqamrI4v95eXmXl5eMueK0fdAJAAACPklEQVR42u3dy07DMBBA0QANKc8C//+xbMYsIllJqQzx+JzuKnVzO4o6lqVOEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIcwByXklRd55ZUXeeXNaAnzijLyyiuvvPLKi7zyZnAflpWnoJC88sorr7zyIq+8mdaJWt7noJS88sorr7zyIq+8PSrH5Vt5rRfyyiuvvPLKi7zyZlwnanlllldeeeWVV1555ZU3U9atvK5VyyuvvPLKK6+88sp7ZO/h1rzWC3nllVdeeeWVV155M6wTxUuo5X0Lysorr7zyyiuvvPLKewRb16RryuesF/LKK6+88sorr7zyZlwnrj1WHzyzvPIOmXeW1/TKK6+Hg+lNlPXavINdq5ZXXnnllVdeeeWV92DH6L89Tt+b9zUMmncpL3lbTu+jvG3ymt6WeRfT2/jhYHpbTu9iev0w6zPveafa1/EQyvunisGO0+WVV1555ZVXXnnlPZjzjU4b7oK88sorr7zyyiuvvPL+p8/QKu80NnnllVdeeeWVV155O18vLqGW1d+DyCuvvPLKK6+88sqbIbNrI/LKK6+88sqLvPL2bO+1alnllVdeeeWVF3nlHWG9WGf9CsrJK6+88sorr7zyytuTj7A3r2LyyiuvvPLKK6+88mZcL1yTlldeeeWVV17klXeEzNYJeeVFXnnlRV55M/r5R9igiLzyIq+88iKvvCNkVkJeeZFXXnmRV14AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCPfANoDmyh5M7mEwAAAABJRU5ErkJggg==",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeBAMAAAA/BWopAAAAGFBMVEURERHrwv/Ll/+wWNmJRb+aTrZIKVReM22oJFmCAAACUklEQVR42u3dQW7iMBiG4axmn96gcAMi34CcwLBn1d6gc/1xJNBkIICqCvDveZ5VpW5efbKSyhVt1wEAAAAAAAAAAAAAAADAf2Rf6NWrV6/e5+qL/ZFevXr16n1u72Qoam89FJF6o+3bBdv3V7R9u1j7Hg7R9o3V289MvWnIKVJvLiL1lnmHUOchxToPKdh5yEOs3nIeYu1bBq75juTi+VDxO0OvXr16W+ntzwwzevXq1av3Oa3nvbXdXevVq1dvC70fxb3emt4ZevXq1dtKb3/FsKDq3vRva0qp6t50EVzH7wZu7JvnuTnnYPumUOe3lt8V3dg3Rd53Os2vbj2/o56bvlfb81evXr16W+nt76jtZ+Bbre9FpN7+/S3Wvm+9fe1r3yc9e689f191d61Xr169rfSefh5vuTcVofbNOcfad7CvfcPuO92xv7J3teD0WempNx/33M688m7nXu/p6yi9x3kj7Ztj7btPsfZNsc7v3r4/sbpju0CvXr1P6h3t23Lv7+I7vd2L6dWrV28rvbfeGevVZj1vreUzI9d6NyU4Um+0fVebzSbYebDvI/cNdn7X6/Wqxt5rzTXdk+jVq1dvq71Ld9e1turVq1dvS71L74y/tbtQveO43cXad7TvI3uDnd+SG2rf3TgGe57V+fyd/m7FUm9XqWi9nx9f9n1k79enfe0bdt/zd0Ztd9R69erV23LvvLn2d4VevXr1ttY7vSOmz+12QUy9tf/ft4t9K/+/euH3dX7tG3TfU7NevXr16gUAAAAAAAAAAAAAABr2B7ijU/JB18ctAAAAAElFTkSuQmCC",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeCAMAAAD69YcoAAAAM1BMVEURERFUyGRRv2szbUdFv2BOtXFXzmDC/8iX/6Fb21iE7ZVgx30ZJR0rWTtyzIy09r0oTzV91MjpAAACa0lEQVR42u3dy07DMBBA0SbUtOH9/18LhPGCiChBlSG2zymrom6uRkYTGfV0AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4BBSUEJeeZFXXnmRV94WXUJaUEZeeeWVV155kVfeFjyFy8IUFJJXXnnllVde5JW3pXViLe8QlJJXXnnllVde5JW3Rvlx+VZe64W88sorr7zyIq+8La4Ta3lllldeeeWVV1555ZW3paxbeV2rlldeeeWVV1555ZX3yN7CrXmtF/LKK6+88sorr7zytrBOZPdhLW/+vbLyHjHv9PUjr+mtMe88vvKWyTuZ3sKHwySvs/dfbV2TXpM/Z72QV1555ZVXXnnllbfFdSJ7DdNO8sorr7zyyiuvvPLKW1PW314n6fRatbzyyiuvvPLKK6+8B3uM/hJK5c3XSeQtk3eYX/IWnd5BXtPr7JX3myHGV17TW+P0dn32Xndafv1zzjuG/P55RWeP0+WVV1555ZVXXnnlPZjrjc47ySuvvPIujPKa3orzjvKaXnnrcxdK5T31TV555ZVXXnnllVfeyteLh7CW1deDyCuvvPLKK6+88srbQmbXRuSVV1555ZUXeeWt2d5r1bLKK6+88sorL/LK28N68fMV/1HeQnnTR9tkeotN72dheQvlnUfX4VBwepPDoVje1Pd/X5af3uTsLfunzfTu9hz25lVMXnnllVdeeeWVV94W1wvXpOWVV1555ZUXeeXtIbN1Ql55kVdeeZFX3hbl9eExKCKvvMgrr7zIK28PmZWQV17klVde5JUXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4I+8NSWWV59bKtQAAAABJRU5ErkJggg=="
        ];
        return quartz[_genElementNum(tokenId)];
    }
}
