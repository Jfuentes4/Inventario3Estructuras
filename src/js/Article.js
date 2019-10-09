class Article {
  constructor (dataArticle)  {
    this._code = dataArticle.code;
    this._name = dataArticle.name;
    this._price = dataArticle.price;
    this._quantity = dataArticle.quantity;
    this._description = dataArticle.description;
  }

  get code () {
    return Number(this._code);
  }

  get name () {
    return this._name;
  }

  get price () {
    return Number(this._price);
  }

  get quantity () {
    return Number(this._quantity);
  }

  get description () {
    return this._description;
  }

  toString () {
    return this._quantity + ' ' + this._name + '(code: ' + this._code + ') ' + this._price + 'c/u';
  }

}

export default Article;
