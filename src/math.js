export function distance(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
}
export function angle(p, q) {
    return Math.atan2(q.y - p.y, q.x - p.x) * (180 / Math.PI);
}

export function uid() {
    const head = Date.now().toString(36);
    const tail = Math.random().toString(36).substring(2);
    return head + tail;
}
