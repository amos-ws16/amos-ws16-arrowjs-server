
let task1 = {
  name: 'wash dishes',
  timestamp: 1479916800,
  duedate: 1480003200,
  user: 'yves',
  assignees: ['jan', 'olli'],
  description: 'It is really dirty in here! Go and wash the dishes!'
}

let task2 = {
  name: 'read a book',
  timestamp: 1479744000,
  duedate: 1480435200,
  user: 'fabian',
  assignees: ['simon', 'olli', 'kevin']
}

let task3 = {
  name: 'clean your room',
  timestamp: 1479830400,
  duedate: 1480003200,
  user: 'yves',
  assignees: ['hans'],
  description: 'It is really dirty in here!',
  location: 'at home'
}

let task4 = {
  name: 'homework',
  timestamp: 1482422400,
  duedate: 1482433200,
  user: 'otto',
  assignees: ['peter', 'simone'],
  location: 'at home'
}

let task5 = {
  name: 'print pdf',
  timestamp: 1482422400,
  duedate: 1482433200,
  user: 'kevin',
  description: 'Print the "how to read a book" file'
}

let task6 = {
  name: 'do some sport',
  timestamp: 1480359600,
  duedate: 1480446000,
  user: 'gerwin mueller II',
  location: 'gym'
}

let task7 = {
  name: 'create a presentation',
  timestamp: 1472151600,
  duedate: 1480446000,
  user: 'max',
  assignees: ['sportsman5000', 'hans', 'guenther']
}

let task8 = {
  name: 'call ute',
  timestamp: 1479841200,
  duedate: 1479844800,
  user: 'bernd',
  assignees: ['karl']
}

let testCase1 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7, task8],
  file: {
    name: 'dirty dish',
    filetype: 'jpeg',
    timestamp: 1479916850,
    user: 'simon'
  }
}

let testCase2 = {
  tasks: [task1, task2, task3, task5],
  file: {
    name: 'How to read a book',
    filetype: 'pdf',
    timestamp: 1479754800,
    user: 'gerald',
    description: 'This book teaches you how to read a book'
  }
}

let testCase3 = {
  tasks: [task1, task2, task3, task4, task5, task6],
  file: {
    name: 'superfit schedule',
    filetype: 'png',
    timestamp: 1480359608,
    user: 'n0rd',
    description: 'This plan shows the schedule for the superfit gym'
  }
}

let testCase4 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7],
  file: {
    name: 'sport presentation',
    filetype: 'pptx',
    timestamp: 1472497200,
    user: 'sportsman5000',
    description: 'wooooow look at my great presentation'
  }
}

let testCase5 = {
  tasks: [task1, task2, task5],
  file: {
    name: 'Wash your dishes right!',
    filetype: 'pdf',
    timestamp: 1479754800,
    user: 'kevin',
    description: 'This is a book about how to wash your dishes realy clean.'
  }
}

let testCase6 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7],
  file: {
    name: '1',
    filetype: 'xml',
    timestamp: 1345921200,
    user: 'petra'
  }
}

let testCase7 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7],
  file: {
    name: 'All keywords',
    filetype: 'json',
    timestamp: 1480273200,
    user: 'ute',
    description: 'dishes, book, presentation, sport, homework, clean, pdf'
  }
}

let testCase8 = {
  tasks: [task6, task7, task8],
  file: {
    name: 'Contact: ute',
    filetype: 'json',
    timestamp: 1479841320,
    user: 'bernd'
  }
}

let testCase9 = {
  tasks: [task1, task2, task3, task4, task5],
  file: {
    name: 'Contact: ute',
    filetype: 'json',
    timestamp: 1479841320,
    user: 'bernd'
  }
}

let testCase10 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7, task8],
  file: {
    name: 'sweet kitten',
    filetype: 'jpeg',
    timestamp: 1479754920,
    user: 'jochen',
    description: 'look at this kitten!'
  }
}

module.exports = {
  testCase1,
  testCase2,
  testCase3,
  testCase4,
  testCase5,
  testCase6,
  testCase7,
  testCase8,
  testCase9,
  testCase10
}
