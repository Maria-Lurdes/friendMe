import {FilterPipe} from './filter.pipe';

describe('FilterPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterPipe();
        expect(pipe).toBeTruthy();
    });

    it('transforms "posts" to "cat type" only elements', () => {

        const pets = [
            {name: 'name', description: 'descr', type: 'cat', age: 1, weight: 11, sex: 'male', color: 'green'},
            {name: 'name', description: 'descr', type: 'dog', age: 1, weight: 11, sex: 'male', color: 'orange'},
            {name: 'name', description: 'descr', type: 'cat', age: 1, weight: 11, sex: 'male', color: 'blue'}];
        const pipe = new FilterPipe();
        const result = pipe.transform(pets, 'cat');
        expect(result).toBeTruthy(!result.find(r => r.type !== 'cat'));
    });
});
