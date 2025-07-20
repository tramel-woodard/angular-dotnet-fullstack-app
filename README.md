# angular-dotnet-fullstack-app
This project is a portfolio piece and technical demonstration to showcase my skills in building full-stack web applications using modern technologies.

# Full-Stack Angular + .NET Monorepo
This repository contains a full-stack demo application using Angular 20 (frontend) and .NET 8 Core (backend).

- **Frontend**: [Angular 20](https://angular.dev)
- **Backend**: [.NET Core / ASP.NET](https://dotnet.microsoft.com/)

## Structure
/frontend → Angular 20 app
/backend → .NET 8 Core backend

## Purpose
This project is a demonstration of full-stack development skills for portfolio and hiring purposes.

## Deep-Dive
An Angular developer familiar with NgRx (Reactive extensions for Angular), a state management library for Angular may wonder why I am using effects outisde
of the designated effects file (product.effects.ts):

```
private productsEffect = effect(() => {
    const products = this.store.selectSignal(ProductSelectors.selectAllProducts)();
    this.products.set(products);
});
```

I had to do this because I chose to showcase my traditional NgRx skills as well as introduce using signals, the newer Angular styled way to handle state management.

I introduced signals using the product array:

```
products = signal<Product[]>([]);
```

However, I also have a selector to call those products:

```
const products = this.store.selectSignal(ProductSelectors.selectAllProducts)();
```

Whenever the selectAllProducts signal changes (after dispatched loadSuccess), we need to update our local products again.

So because of this, I am using effect to create a reactive bridge between NgRx selectors and local signals in my component.

## Using Angular 20 with older libraries or dependencies

I also chose to create an Angular 20 application instead of 19 to prepare for some of Angular's latest functionalities. Because of this, at the time of this application's
creation, there are some libraries (like NgRx libraries other than @ngrx/store) that have not yet been made compatible with Angular 20 (20.0.0 at the time of this README).

Because of this, we will need to perform our npm installations (for the time being) with the legacy peer dependency option, like this:

```
npm install @package/directory --legacy-peer-deps
```

to allow the Angular CLI to sort out any discrepencies between newer and older library versions.

## License
This project is licensed under the [MIT License](LICENSE).  
It is intended for **demonstration and hiring purposes only**. If you're interested in collaborating or discussing professional opportunities, feel free to [contact me](mailto:tramel@mindsect.com).

---

**Note**: Any configuration files containing secrets (e.g., API keys, connection strings) are not included in this repository for security reasons.