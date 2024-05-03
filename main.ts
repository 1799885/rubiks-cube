let moveImage: Image = null
moveImage = image.create(scene.screenWidth(), 8)
let moveSprite = sprites.create(moveImage, 0)
moveSprite.x = scene.screenWidth() / 2
moveSprite.y = 4
moveSprite.setFlag(SpriteFlag.Ghost, true)

let currMove: CubeTransform = CubeTransform.Front
let moves: string = ''
writeCurrMove()

let myCube: cube.Cube = cube.buildCube(3)

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    currMove += -1
    if (currMove == CubeTransform.None) {
        currMove = CubeTransform.Standing
    }  // if (currMove === CubeTransform.None)
    writeCurrMove()
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    currMove += 1
    if (currMove == CubeTransform.InsideFront) {
        currMove = CubeTransform.Front
    }  // if (currMove === CubeTransform.InsideFront)
    writeCurrMove()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    myCube.move({transform: currMove, inverse: false})
    addCurrMove(false)
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    myCube.move({transform: currMove, inverse: true})
    addCurrMove(true)
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    game.showLongText(moves, DialogLayout.Center)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function(){
    myCube.move({transform: CubeTransform.Shuffle, inverse: false})
})

function addCurrMove(inverse: boolean): void {
    if (moves.length === 0) {
        moves = cube.MOVE_NAMES[currMove][1]
    } else {
        moves += ' ' + cube.MOVE_NAMES[currMove][1]
    }   // if (!moves)
    if (inverse) {
        moves += "'"
    }   // if (inverse)
}   // addCurrMove()

function writeCurrMove () {
    moveImage.fill(0)
    let m: string = cube.MOVE_NAMES[currMove][0]
    moveImage.printCenter(m, 1, 5, image.font8)
}   // writeCurrMove()
