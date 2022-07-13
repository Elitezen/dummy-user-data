const adjectivesData = [
  'heartbreaking',
  'fluttering',
  'clammy',
  'rebel',
  'taboo',
  'lavish',
  'several',
  'dramatic',
  'similar',
  'onerous',
  'ugliest',
  'dependent',
  'understood',
  'fabulous',
  'rare',
  'needy',
  'hellish',
  'equable',
  'oafish',
  'meaty',
  'proud',
  'ossified',
  'itchy',
  'faulty',
  'unnatural',
  'gleaming',
  'awake',
  'loving',
  'abstracted',
  'petite',
  'racial',
  'ultra',
  'periodic',
  'evanescent',
  'traditional',
  'stingy',
  'phobic',
  'befitting',
  'lush',
  'tiresome',
  'abnormal',
  'torpid',
  'young',
  'emotional',
  'piquant',
  'nippy',
  'ritzy',
  'tan',
  'limping'
]

const namesData = [
  'Winston',
  'Presley',
  'Taniyah',
  'Arjun',
  'Kolby',
  'Trevin',
  'Kamari',
  'Makena',
  'Myah',
  'Mira',
  'Harrison',
  'Aaden',
  'Nicole',
  'Bernard',
  'Jason',
  'Holden',
  'Kane',
  'Melanie',
  'Jovani',
  'Matthias',
  'Emma',
  'Katelynn',
  'Kaylin',
  'Jordyn',
  'Raphael',
  'Amya',
  'Jaylynn',
  'Rachael',
  'Kassandra',
  'Rigoberto',
  'Jocelyn',
  'Aleah',
  'Yazmin',
  'Destiney',
  'Simeon',
  'Stacy',
  'Athena',
  'Mariana',
  'Maeve',
  'Raegan',
  'Elle',
  'Pedro',
  'Danny',
  'Reece',
  'Noe',
  'Brady',
  'Emely',
  'Ashtyn',
  'Lillie',
  'Lewis'
]

const symbolsData = ['_', '.', '@', '-'];
const numbersData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lettersData = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const emailDomainsData = ['gmail', 'yahoo'];

/**
 * Capitalizes a given string.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str = '') {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Choses `amount` random values from `arr`
 * @param {unknown[]} arr 
 * @param {number | `${number}`} amount 
 * @returns {unknown | unknown[]} A single item if `amount` is 1, otherwise an array.
 */
function chooseRandom(arr = [], amount = 1) {
  const selected = [];
  [...Array(amount)].forEach(() => {
    selected.push(arr[Math.floor(Math.random() * arr.length)]);
  });

  return selected.length === 1 ? selected[0] : selected;
}

/**
 * Generates `amount` number of random user data.
 * @param {number | `${number}`} amount How many to generate.
 * @param {object} options Options describing rules to confine the given string. 
 * @param {boolean} options.symbols Whether to include symbols in the usernames.
 * @param {string[]} options.allowedSymbols Allowed symbols in a username.
 * @param {boolean} options.numbers Whether to include numbers in the usernames.
 * @param {number | `${number}`} options.minimumLength The minimum length of the usernames.
 * @param {number | `${number}`} options.maximumLength The maximum length of the usernames.
 * @returns {string | string[]} A single string if `amount` is 1, otherwise an array.
 */
function generateRandomUsername(amount = 1, options = {}) {
  options = Object.assign({
    symbols: false,
    allowedSymbols: symbolsData,
    numbers: true,
    minimumLength: 6,
    maximumLength: 16
  }, options);

  const { symbols, allowedSymbols, numbers, minimumLength, maximumLength } = options;

  if (maximumLength < minimumLength) throw new TypeError('maximumLength must be greater than minimumLength')

  let usernames = [];
  for (let i = 0; i < amount; i++) {
    const adj = capitalize(chooseRandom(adjectivesData, 1));
    const underscore = (symbols && (Math.random() > 0.7)) ? '_' : '';
    const name = capitalize(chooseRandom(namesData, 1));
    const symbol = symbols ? chooseRandom(allowedSymbols || symbolsData, 1) : '';
    const number = (numbers && chooseRandom(numbersData, 3).join('')) || '';
    let username = `${adj}${underscore}${name}${symbol}${number}`;

    if (username.length < minimumLength) {
      const charsLeft = minimumLength - username.length;
      username += chooseRandom(lettersData, charsLeft)?.join?.('') || '';
    } else if (username.length > maximumLength) {
      username = username.slice(0, maximumLength);
    }
    
    usernames.push(username);
  }

  return usernames.length === 1 ? usernames[0] : usernames;
}

/**
 * Generates `amount` number of random emails.
 * @param {number | `${number}`} amount How many to generate.
 * @param {object} options Options describing rules to confine the given string. 
 * @param {string[]} options.domains Email domains to use. Example: `['gmail', 'yahoo', 'aol']` 
 * @returns {string | string[]} A single string if `amount` is 1, otherwise an array.
 */
function generateRandomEmail(amount = 1, options = {}) {
  options = Object.assign({
    domains: emailDomainsData
  }, options);
  const { domains } = options;

  let emails = [];
  [...Array(amount)].forEach(() => {
    const name = chooseRandom(adjectivesData, 2).join('');
    const domain = chooseRandom(domains);

    emails.push(`${name}@${domain}.com`);
  });

  return amount == 1 ? emails[0] : emails;
}

/**
 * Generates `amount` number of random ids.
 * @param {number | `${number}`} amount How many to generate.
 * @param {object} options Options describing rules to confine the given id. 
 * @param {number | `${number}`} options.length The length of each id.
 * @param {boolean} options.parseString Whether to calculate and return the id in string form.
 * @returns {string | string[]} A single string if `amount` is 1, otherwise an array.
 */
function generateRandomId(amount = 1, options = {}) {
  options = Object.assign({
    length: 9,
    parseString: true
  }, options);

  const { length, parseString } = options;
  let ids = [];

  for (let i = 0; i < amount; i++) {
    const min = Number('1' + '0'.repeat(length - 1));
    const max = Number('9'.repeat(length));
    const id = parseString ? String(Math.floor(Math.random() * max) + min) : Math.floor(Math.random() * max) + min;

    ids.push(id);
  }

  return amount == 1 ? ids[0] : ids;
}

/**
 * Generates `amount` number of random users.
 * @param {number} amount How many to generate.
 * @param {object} options Options which contain rules for generated values of the user.
 * @param {number | `${number}`} options.idRules.length The length of each id.
 * @param {boolean} options.idRules.parseString Whether to calculate and return the id in string form.
 * @param {boolean} options.usernameRules.symbols Whether to include symbols in the usernames.
 * @param {string[]} options.usernameRules.allowedSymbols Allowed symbols in a username.
 * @param {boolean} options.usernameRules.numbers Whether to include numbers in the usernames.
 * @param {string[]} options.emailRules.domains Email domains to use. Example: `['gmail', 'yahoo', 'aol']` 
 * @param {number | `${number}`} options.usernameRules.minimumLength The minimum length of the usernames.
 * @param {number | `${number}`} options.usernameRules.maximumLength The maximum length of the usernames.
 * @param {string} options.profileImages The different sized profile images to use.
 * @param {string} options.profileImages.small The small image url.
 * @param {string} options.profileImages.medium The medium image url.
 * @param {string} options.profileImages.large The large image url.
 * @returns {object}
 */
function generateUsers(amount = 1, options = {}) {
  const { usernameRules, emailRules, idRules, profileImages } = options;

  let users = [];

  for (let i = 0; i < amount; i++) {
    const user = {
      id: generateRandomId(1, idRules),
      username: generateRandomUsername(1, usernameRules),
      email: generateRandomEmail(1, emailRules),
      profileIcon: {
        small: profileImages?.small || '',
        medium: profileImages?.medium || '',
        large: profileImages?.large || ''
      },
    };

    users.push(user);
  }

  return amount == 1 ? users[0] : users;
}

export {
  capitalize,
  chooseRandom,
  generateRandomEmail,
  generateRandomId,
  generateRandomUsername,
  generateUsers
}

const users = generateUsers(3, {
  usernameRules: {
    symbols: true,
    allowedSymbols: ['_', '-', '.'],
    numbers: true,
    minimumLength: 4,
    maximumLength: 12
  },
  emailRules: {
    domains: ['gmail', 'yahoo', 'example'],
  },
  idRules: {
    length: 7,
    parseString: true
  }
})

console.log(users);