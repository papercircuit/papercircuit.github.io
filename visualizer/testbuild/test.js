function doesNothing(something) {
    for (let i = 0; i < 10; i++) {
        something += i;
        console.log(something);
    }
    return something;
    
}