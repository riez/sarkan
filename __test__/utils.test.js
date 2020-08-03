const {serialize} = require('../src/utils/index')

test('Serialize Object Query to String', () => {
    expect(serialize({website: 'efishery'})).toBe('website=efishery');
});

test('Serialize Mutiple Object Query to String', () => {
    expect(serialize({searchQuery: 'Bandeng', limit: "64"})).toBe('searchQuery=Bandeng&limit=64');
});