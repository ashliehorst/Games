
function box2(x, y, w, h)
{
    this.pos = new vec2(x, y);
    this.halfW = w * .5;
    this.halfH = h * .5;
    this.min = new vec2(x - this.halfW, y - this.halfH);
    this.max = new vec2(x + this.halfW, y + this.halfH);
    this.width = w;
    this.height = h;
}

box2.prototype.move = function(d, m)
{
    var mv = d.scale(m);
    this.pos = this.pos.addVec(mv);
    this.min = this.min.addVec(mv);
    this.max = this.max.addVec(mv);
};

box2.prototype.moveX = function(xMove)
{
    this.pos.x += xMove;
    this.min.x += xMove;
    this.max.x += xMove;
};

box2.prototype.moveY = function(yMove)
{
    this.pos.y += yMove;
    this.min.y += yMove;
    this.max.y += yMove;
};

box2.prototype.draw = function(context, r, g, b)
{
    context.save();
    context.fillStyle = "rgb("+r+","+g+","+b+")";
    context.translate(this.pos.x, this.pos.y);
    context.scale(this.width, this.height);
    context.fillRect(-.5,-.5, 1, 1);
    context.restore();
}

box2.prototype.drawImage = function(context, image)
{
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.scale(this.width, -this.height);
    context.drawImage(image,-.5,-.5, 1, 1);
    context.restore();
}

function intersects_BoxPoint(b, p)
{
    return (p.x > b.min.x && p.x < b.max.x &&
            p.y > b.min.y && p.y < b.max.y);
}

function intersects_BoxBox(b1, b2)
{
    return (b1.min.x < b2.max.x && b1.max.x > b2.min.x &&
            b1.min.y < b2.max.y && b1.max.y > b2.min.y);
}

function mtv_BoxBox(b1, b2)
{
    var mtv = new vec2(0,0);
    var left   = b2.min.x - b1.max.x;
    var right  = b2.max.x - b1.min.x;
    var bottom = b2.min.y - b1.max.y;
    var top    = b2.max.y - b1.min.y;

    if (Math.abs(left) > right) mtv.x = right;
    else                        mtv.x = left;

    if (Math.abs(bottom) > top) mtv.y = top;
    else                        mtv.y = bottom;

    if (Math.abs(mtv.x) <= Math.abs(mtv.y)) mtv.y = 0;
    else                                    mtv.x = 0;

    return mtv;
}

function mtv_xy_BoxBox(b1, b2)
{
    var mtv = new vec2(0,0);
    var left   = b2.min.x - b1.max.x;
    var right  = b2.max.x - b1.min.x;
    var bottom = b2.min.y - b1.max.y;
    var top    = b2.max.y - b1.min.y;

    if (Math.abs(left) > right) mtv.x = right;
    else                        mtv.x = left;

    if (Math.abs(bottom) > top) mtv.y = top;
    else                        mtv.y = bottom;

    return mtv;
}



