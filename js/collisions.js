function checkCollision(owner, target) {

    var ownerBorders = owner.getBoundingClientRect(owner);
    var targetBorders = target.getBoundingClientRect(target);

    if ((ownerBorders.top < targetBorders.bottom && ownerBorders.bottom > targetBorders.top) && (ownerBorders.right > targetBorders.left && ownerBorders.left < targetBorders.right)) {
        //console.log("collided");
        return true;
    }
}

function setLimits() {
    leftBorderLimits = leftBorder.getBoundingClientRect(leftBorder);
    rightBorderLimits = rightBorder.getBoundingClientRect(rightBorder);
}

window.addEventListener("resize", setLimits);