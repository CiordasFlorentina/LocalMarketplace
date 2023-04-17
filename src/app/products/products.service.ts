import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() {
  }

  getProducts(sortBy: string, categories: string[], seasons: string[]): Observable<any> {
    return of({
        sortBy: 'name',
        items: [
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 5
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 0
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 5
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 0
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 5
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 5
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 5
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 5
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 5
          },
          {
            name: 'carrots',
            image: 'https://media.istockphoto.com/id/545454816/ro/fotografie/morcovi-proaspe%C8%9Bi-izola%C8%9Bi-pe-fond-alb.jpg?s=612x612&w=0&k=20&c=wQIfpDbGx3zznJOnTlgu9QDRfdvMg1v0o9wwyOrr570=',
            price: 25,
            category: 'vegetables',

            availability: 5
          },
        ]
      }
    ).pipe(delay(500));
  }
}
