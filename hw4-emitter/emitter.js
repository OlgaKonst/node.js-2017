// написать свой класс, унаследованный от EventEmitter, который будет работать с файловой системой
// когда файл считан, будет выдавать событие end, data и т.д.
//
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

class EventEmitterFS extends EventEmitter {
  constructor() {
    super();
  }
  readFile(file) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log('err ', err);
      } else {
        this.emit('read', data);
      }
    });
  }
  writeFile(file, data) {
    fs.writeFile(file, data, (err) => {
      if (err) {
        console.log('err ', err);
      } else {
        this.emit('write');
      }
    });
  }
  createFile(fileName, data) {
    fs.writeFile(fileName, '', (err) => {
      if (err) {
        console.log('err ', err);
      } else {
        this.emit('create');
      }
    });
  }
  copyFile(fileName1, fileName2) {
    const file = fs.readFile(fileName1, 'utf8', (err, data) => {
      if (err) {
        console.log('err ', err);
      } else {
        return data;
      }
    });
    fs.writeFile(fileName2, file, (err) => {
      if (err) {
        console.log('err ', err);
      } else {
        this.emit('copy');
      }
    });
  }
}

const myEmitter = new EventEmitterFS();

myEmitter.on('read', (data) => {
  console.log('data 123 ', data);
});
myEmitter.on('write', () => {
  console.log('Writed!');
});
myEmitter.on('create', () => {
  console.log('Created!!');
});
myEmitter.on('copy', () => {
  console.log('Copy done!');
});

myEmitter.readFile('hw4-emitter/file1.txt');
myEmitter.writeFile('hw4-emitter/file2.txt', 'qwerty123');
myEmitter.createFile('hw4-emitter/newfile.txt', null);
myEmitter.copyFile('hw4-emitter/file1.txt', 'hw4-emitter/filecopy.txt');

