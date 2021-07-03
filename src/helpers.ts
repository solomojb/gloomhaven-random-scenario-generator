import { BaseGameData } from "./games";

export class Helpers {
    static uniqueArray(arr: Array<any>, sort: boolean = true) {
        const result: Array<any> = [];
        arr.forEach(entry => {
            if (!result.includes(entry)) {
                result.push(entry);
            }
        });
        return sort ? result.sort() : result
    }

    static parseEffectText(text: string) {
        [
            "BLESS",
            "CURSE",
            "DISARM",
            "IMMOBILIZE",
            "INVISIBLE",
            "MUDDLE",
            "PIERCE",
            "POISON",
            "PULL",
            "PUSH",
            "REGENERATE",
            "ROLLING",
            "STRENGTHEN",
            "STUN",
            "TARGET",
            "WOUND",
        ].forEach(status => {
            const reg = new RegExp(`\\b${status}\\b`, 'g');
            text = text.replace(reg, status + '<img class="icon" src="'+require('./img/icons/status/'+status.toLowerCase()+'.png')+'" alt=""/>');
        });

        [
            "Attack",
            "Move",
            "Range",
        ].forEach(find => {
            const reg = new RegExp(`(\\+\\d+ ${find}\\b)`, 'g');
            text = text.replace(reg, "$1" + '<img class="icon" src="'+require('./img/icons/general/'+find.toLowerCase()+'.png')+'" alt=""/>');
        });

        [
            "Attack",
            "Heal",
            "Shield",
            "Retaliate",
            "Move",
            "Range",
            "Loot",
        ].forEach(find => {
            const reg = new RegExp(`\\b(${find})\\b (\\d+)`, 'g');
            text = text.replace(reg, "$1" + '<img class="icon" src="'+require('./img/icons/general/'+find.toLowerCase()+'.png')+'" alt=""/>' + "$2");
        });

        text = text.replace(/\bsmall items\b/g, '<img class="icon" src="'+require('./img/icons/equipment_slot/small.png')+'" alt=""/> items');
        text = text.replace(/\bRefresh\b/g, 'Refresh<img class="icon" src="'+require('./img/icons/general/refresh.png')+'" alt=""/>');
        text = text.replace(/\bRecover\b/g, 'Recover<img class="icon" src="'+require('./img/icons/general/recover.png')+'" alt=""/>');
        text = text.replace(/\bJump\b/g, 'Jump<img class="icon" src="'+require('./img/icons/general/jump.png')+'" alt=""/>');
        text = text.replace(/\bFlying\b/g, 'Flying<img class="icon" src="'+require('./img/icons/general/flying.png')+'" alt=""/>');
        text = text.replace(/\bTeleport\b/g, 'Teleport<img class="icon" src="'+require('./img/icons/general/teleport.png')+'" alt=""/>');
        text = text.replace(/{exp1}/g, '<img class="icon" src="'+require('./img/icons/general/experience_1.png')+'" alt=""/>');
        text = text.replace(/{Doom}/g, '<span class="doom">Doom</span>');
        text = text.replace(/{modifier_minus_one}/g, '<img class="icon" src="'+require('./img/icons/general/modifier_minus_one.png')+'" alt=""/>');
        text = text.replace(/{consumed}/g, '<img class="icon" src="'+require('./img/icons/general/consumed.png')+'" alt=""/>');
        [
            'any',
            'earth',
            'fire',
            'ice',
            'light',
            'dark',
            'wind',
        ].forEach(
            (element => {
                const reg = new RegExp(`{${element}(X?)}`, 'g');
                // text = text.replace(reg, '<img class="icon" src="'+require('./img/icons/element/'+element.toLowerCase()+'.png')+'" alt=""/>' );
                text = text.replace(reg, (m, m1) => '<img class="icon" src="'+require('./img/icons/element/'+element.toLowerCase()+m1+'.png')+'" alt=""/>');
            })
        );

        text = text.replace(/{multi_attack\.(.+?)}/, (m, m1) => {
            let className = 'icon';
            const type = m1.replace(/^(.+?)_.*$/, '$1');
            if (['cleave', 'cone', 'cube'].includes(type)) {
                className += ' double-height';
            }
            return `<img class="${className}" src="${require('./img/icons/multi_attack/' + m1 + '.png')}" alt=""/>`;
        });

        return text;
    }

    static shuffle(array: any[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

      static  toAllFirstUpper( str: string) {
        return str ? str.split(" ").map(word => word[0].toUpperCase() + word.substr(1)).join(" ") : str;
      }

      static getLink = ({game, category, id, rotate = false, hexType, rotation = 0}:{game:BaseGameData, category:string, id:string, rotate?:boolean, hexType?:string, rotation?:number}) => {
          if (id.length === 0 || category.length === 0){
              return {link:"", style:{}};
          }
        let link = undefined;
        let style = {};
        switch (category) {
            case "monster":
                link = game.getMonsterImage(id, rotate);
              break;
            case "doors":
              link = game.getDoorImage2(id, rotate);
              break;
            case "treasures":   
              link = game.getTreasureImage(rotate);
              break;
            case "coin":
              link = game.getCoinImage();
              break;
            case "status":
              link = game.getStatusPath(id);
              break;
        default:
                link = game.getOverlayTokenPath(id, category);
                let transform:string = "";
                let transformOrigin:string ="";
                const objectRotation = ((rotate ? 90 : 0)+ rotation)% 360;
                if (objectRotation) {
                    transform += `rotate(${objectRotation}deg)`;
                }

                if (hexType === "2x1R" || hexType === "2x1D") {
                    transform += ` scaleY(2)`;
                    transform += ` translateY(25%)`
                }
                if (hexType === "2x3") {
                    transform += ` scale(2)`;
                    transform += ` translate(25%, 25%)`
                }
                style = {transform, transformOrigin}
                break;
      }
      return {link, style};
    }
      
}