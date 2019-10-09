import Article from './Article.js';

class InventaryManager {
  constructor () {
    this._first = null;
  }

  addArticle = (dataArticle) => {
    if (this._ifDontExist(dataArticle.code)) {
      if(this._setArticleToArrayAndLS(dataArticle)){
        window.alert('el articulo ha sido añadido correctamente');
      }
    } else {
      window.alert('este Articulo ya esta actualmente registrado');
    }
    console.log(this._first);
  }

  _setArticleToArrayAndLS = (dataArticle) => {
    let success = false;
    console.log(dataArticle);
    if (this._first === null) {
      this._first = {data: new Article(dataArticle), next: null};
    } else {
      this._add(dataArticle, this._first);
    }

    return success;
  }

  _add = (newElement, lastElement) => {
    if (lastElement.next === null) {
      lastElement.next = {data: new Article(newElement), next: null};
    } else {
      this._add(newElement, lastElement.next);
    }
  }

  deleteArticle = (code) => {
    let found = this.findArticle(Number(code));
    if (found){
      this._myRemove(code);
      window.alert('Se ha eliminado el producto ' + code + ' correctamente.');
    } else {
      window.alert('no se encontro el producto con el codigo ' + code);
    }
  }

  _myRemove = (code) => {
    let deleted = false,
    current = this._first;
    while (current.next !== null && !deleted) {
      if (current.next.data.code === code) {
        current.next = current.next.next;
        deleted = true;
      }
    }
    return deleted;
  }

  searchArticles = (str) => {
    let result = this.findArticle(Number(str));
    console.log(result);
    if (result){
      window.alert('Codigo: ' + result.data.code + ' Nombre: ' + result.data.name + ' Price: ' + result.data.price +
      ' Cantidad: '+ result.data.quantity + ' Descripcion: ' + result.data.description);
    } else {
      window.alert('no se encontro el producto con el indice ' + str);
    }
  }

  report = (report) => {
    let reportstr = '<h3>Reporte de Inventario</h3> <br><br>',
    sumArticles = 0,
    current = this._first,
    noArticlesD = 0;

    while (current !== null){
      noArticlesD++;
      sumArticles += current.data.quantity;
      reportstr += 'Codigo: ' + current.data.code + ' Nombre: ' + current.data.name + ' Price: ' + current.data.price +
      ' Cantidad: '+ current.data.quantity + ' Descripcion: ' + current.data.description + '<br>';
      current = current.next;
    }

    reportstr += '<br>Total de Articulos Distintos: ' + noArticlesD + ' Total de Articulos en inventario: ' + sumArticles;
    report.innerHTML = reportstr;
  }

  inverseReport = (report) => {
    let reportstr = '<h3>Reporte de Inventario</h3> <br><br>',
    current = this._first,
    sumArticles = 0,
    noArticlesD = 0;

    reportstr += this._getStrInverseElements(current);
    while (current !== null){
      noArticlesD++;
      sumArticles += current.data.quantity;
      current = current.next;
    }

    reportstr += '<br>Total de Articulos Distintos: ' + noArticlesD + ' Total de Articulos en inventario: ' + sumArticles;
    report.innerHTML = reportstr;
  }

  _getStrInverseElements= (current) => {
    if (current.next !== null) {
      let lastStr = this._getStrInverseElements(current.next);
      let newStr = 'Codigo: ' + current.data.code + ' Nombre: ' + current.data.name + ' Price: ' + current.data.price +
      ' Cantidad: '+ current.data.quantity + ' Descripcion: ' + current.data.description + '<br>';

      return lastStr + newStr;
    } else {
      return 'Codigo: ' + current.data.code + ' Nombre: ' + current.data.name + ' Price: ' + current.data.price +
      ' Cantidad: '+ current.data.quantity + ' Descripcion: ' + current.data.description + '<br>';
    }
  }


  _ifDontExist = (code) => {
    let dontExist = true;
    if (this.findArticle(code)) {
      dontExist = false;
    }
    return dontExist;
  }

  findArticle = (pCode) => {
    let found = false,
    current = this._first;
    while (current !== null && !found) {
      console.log(current.data.code);
      if (current.data.code === pCode) {
        found = current;
      } else {
        current = current.next;
      }
    }
    return found;
  }

}

export default InventaryManager;
