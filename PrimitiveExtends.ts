export class PrimitiveExtends {constructor(){}}

declare global {
    interface Boolean {
        ToNumber() : number;
        ToString(this : boolean) : string;
    }
    interface String {
        IsNumeric() : boolean;
        IsMail():boolean ;
        ReplaceAll(oldStr : string, newStr : string) : string;
        ToNumber() : number;
        ToBase64() : Promise<string> ;
        Contain(search: string) : boolean;
        LastString(this :string, spliter : string):string;
        NbOccur(this : string, search: string) : number;
        RemoveAccent(this : string):string;
    }
    interface StringConstructor {
        IsStrNotEmptyOrNull(str : string) : boolean;
    }
    interface Date {
        Equal(this : Date, otherDate : Date) :boolean;
        AddDays(this : Date, days : number) :Date;
        ToLocalString(this : Date): string;
        ToLocalStringEpurate(this : Date): string;
        ToUtcString(this : Date): string;
        ToUtcSqlString(this : Date): string;
        ToUtcSqlStringDate(this : Date): string;
        GetUTCTimeStamp(this : Date) : number;
    }
    interface DateConstructor {
        IsValidDate(dateToTest: string): boolean ;
        GetUTCTimeStamp() : number;
        GetUTCDate() : Date;
        TSUtcToDate(ts : number) : Date;
        TsUtcToLocalString(ts : number):string;
        TsUtcToLocalStringEpurate(ts : number):string;
    }
    interface Number {
        ToNumber() : number;
        ToNDigit(dig? : number) : string;
        Round(decimal? : number) : number;
        ToBool() : boolean;
        DecInc(increment: boolean, step: number): number;
    }

    interface ObjectConstructor {
        ToCustomStr(obj : any,jointure: string, before?: string, after?: string): string;
        GetConstructorName(obj : any)  :string;
    }
    interface Array<T> {
        Contains<T>(this: T[], obj:T) :boolean;
        ToCustomStr(jointure: string, before: string, after: string): string;
        Remove(item :T);
    }
}

Boolean.prototype.ToNumber = function(this : boolean): number {
  return this && this === true ? 1 : 0 ;
}

Boolean.prototype.ToString = function(this : boolean): string {
  return this && this === true ? `YES` : `NO` ;
}

String.prototype.Contain = function(this : string, search: string): boolean {
    return this.indexOf(search) > -1;
}

String.prototype.ToBase64 = function(this: string): Promise<string> {
  return new Promise(resolve => {
    let img: string = this.substr(this.indexOf(',') + 1);
    resolve(img);
  });
}

String.prototype.IsNumeric = function (this :string) : boolean {
    return !isNaN(+this);
}

String.prototype.IsMail = function (this : string) : boolean {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(this);
}

String.prototype.LastString = function (this :string, spliter : string) : string {
    return this.substr(this.lastIndexOf(spliter) + 1);
}

String.prototype.ReplaceAll = function(this : string,oldStr: string, newStr: string) : string {
    //Ne marche aps avec les backSlash
    //return this.replace(new RegExp(oldStr, 'g'), newStr);
    return this.split(oldStr).join(newStr);
}

String.prototype.ToNumber = function(this: string): number {
        return Number(this);
}

String.prototype.NbOccur = function(this : string, search: string) : number {
    return this.split(search).length - 1;
}

String.prototype.RemoveAccent = function(this : string) : string{
    let accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    let noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    let str = this;
    for(let i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
}

String.IsStrNotEmptyOrNull = function(str: string) : boolean {
    return str && str.toString().trim() !== "";
}

Number.prototype.ToNumber = function(this : number): number {
        return this ? Number(this.toString()): null;
}
Number.prototype.ToNDigit = function (this: number, n : number = 2) : string {
    let nb : string = this.toString();
    for (let index = 0; index < n; index++) {
        if(!nb[index]){
            nb = `0${nb}`;
        }
    }
    return nb ;
}
Number.prototype.Round = function(this: number, decimal: number = 0) : number {
    let multiple = Math.pow(10, decimal);
    return Math.round(this * multiple) / multiple;
}
Number.prototype.ToBool = function(this : number): boolean {
    return (this === 0 ? false : true);
}

Number.prototype.DecInc = function (this: number, increment: boolean, step: number): number {
        let val : number = this;
        val = Math.round(((increment ? step : -step ) + parseFloat(val.toString()) )* 10) / 10;
        return val;
}

Date.prototype.ToUtcString = function(this : Date): string {
  let yy = this.getUTCFullYear() % 100;
  let mm = this.getUTCMonth() + 1;
  let dd = this.getUTCDate();
  let h = this.getUTCHours();
  let m = this.getUTCMinutes();
  let s = this.getUTCSeconds();
  let ms = this.getUTCMilliseconds();
  let formatedDate : string = `${dd.ToNDigit()}/${mm.ToNDigit()}/${yy.ToNDigit()} ${h.ToNDigit()}:${m.ToNDigit()}:${s.ToNDigit()}:${ms.ToNDigit(3)} GMT+0000`;
  return formatedDate;
}

Date.prototype.ToUtcSqlString = function(this : Date): string {
  let yy = this.getUTCFullYear();
  let mm = this.getUTCMonth() + 1;
  let dd = this.getUTCDate();
  let h = this.getUTCHours();
  let m = this.getUTCMinutes();
  let s = this.getUTCSeconds();
  let formatedDate : string = `${yy.ToNDigit()}-${mm.ToNDigit()}-${dd.ToNDigit()} ${h.ToNDigit()}:${m.ToNDigit()}:${s.ToNDigit()}`;
  return formatedDate;
}

Date.prototype.ToUtcSqlStringDate = function(this : Date): string {
  let yy = this.getUTCFullYear();
  let mm = this.getUTCMonth() + 1;
  let dd = this.getUTCDate();
  let formatedDate : string = `${yy.ToNDigit()}-${mm.ToNDigit()}-${dd.ToNDigit()}`;
  return formatedDate;
}

Date.prototype.ToLocalString = function(this : Date): string {
  let yy = this.getFullYear() % 100;
  let mm = (this.getMonth() + 1);
  let dd = this.getDate();
  let h = this.getHours();
  let m = this.getMinutes();
  let s = this.getSeconds();
  let formatedDate : string = `${dd.ToNDigit()}/${mm.ToNDigit()}/${yy.ToNDigit()} ${h.ToNDigit()}:${m.ToNDigit()}:${s.ToNDigit()}`;
  return formatedDate;
}

Date.prototype.ToLocalStringEpurate = function(this : Date): string {
  let yy = this.getFullYear() % 100;
  let mm = (this.getMonth() + 1);
  let dd = this.getDate();
  let h = this.getHours();
  let m = this.getMinutes();
  let s = this.getSeconds();
  let formatedDate : string = `${dd.ToNDigit()}/${mm.ToNDigit()}/${yy.ToNDigit()}`;
  if (s === 0) {
    if (m === 0) {
      if (h !== 0) {
        formatedDate += ` ${h.ToNDigit()}$`;
      }
    }else{
      formatedDate += ` ${h.ToNDigit()}:${m.ToNDigit()}`;
    }
  }else{
    formatedDate += ` ${h.ToNDigit()}:${m.ToNDigit()}:${s.ToNDigit()}`;
  }
  return formatedDate;
}

Date.prototype.Equal = function(this : Date, otherDate : Date) : boolean {
  return this.valueOf() === otherDate.valueOf();
}

Date.prototype.AddDays = function(this : Date, days : number) {
  this.setDate(this.getDate() + days);
  return this;
}

Date.prototype.GetUTCTimeStamp = function(this : Date):number {
    let tsUTC : number = this.getTime();
    if (tsUTC > 1000000000000) {
        tsUTC = Math.round(tsUTC/1000);
    }
    return tsUTC;
}

Date.IsValidDate = function(dateToTest : string):boolean {
    return !isNaN(new Date(dateToTest).getTime());
}

Date.GetUTCDate = function():Date {
  let now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

declare var Date : any;

Date.TSUtcToDate = function(tsUTC : number):Date {
  if (tsUTC < 1000000000000) {
      tsUTC = tsUTC*1000;
  }
  return new Date(tsUTC);
}

Date.GetUTCTimeStamp = function():number {
    let tsUTC : number = new Date().GetUTCTimeStamp();
    return tsUTC;
}
Date.TsUtcToLocalString = function(tsUtc : number) : string {
  return Date.TSUtcToDate(tsUtc).ToLocalString();
}

Date.TsUtcToLocalStringEpurate = function(tsUtc : number) : string {
  return Date.TSUtcToDate(tsUtc).ToLocalStringEpurate();
}

Object.ToCustomStr = function(obj: any, jointure: string, before: string = "", after: string = ""): string {
    let result = ``;
    for (let currentStr in obj) {
      result += `${before}${currentStr}${after}${jointure}`;
    }
    return result.substring(0, result.lastIndexOf(jointure));
  }


Object.GetConstructorName = function(obj: any) :string {
    return obj && obj[0] ? obj[0].constructor["name"]:obj.constructor["name"] ;
}

Array.prototype.Contains = function<T>(this: T[], obj:T) :boolean {
      for (var i = 0; i < this.length; i++) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

Array.prototype.Remove = function<T>(this: T[], item:T) {
      let index : number = this.indexOf(item);
      if (index > -1 ) {
          this.splice(index, 1);
      }

}

Array.prototype.ToCustomStr = function(this : any[], jointure: string, before: string = "", after: string = ""): string {
  let result = ``;
  if (this.length !== undefined) {
    for (let i = 0; i < this.length; i++) {
      result += `${before}${this[i]}${after}${jointure}`;
    }
  }
  //console.log(result.substring(0, result.lastIndexOf(jointure)));
  return result.substring(0, result.lastIndexOf(jointure));
}
