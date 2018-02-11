const test = {

  prop: 5,

  func1: str => {
    console.log(str);
  },

  func2(str) {
    this.func1(str);
    // console.log(this.prop)
  }
}

test.func2('test');