import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myblogfilter'
})
export class MyblogPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    // console.log("items",items)
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      console.log("values",it)
      console.log('search value',searchText)
       return (it.BlogHeading.includes(searchText) || it.hashTags.includes(searchText));
    });


  }

}
