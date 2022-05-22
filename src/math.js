export function length(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
}
export function angle(p, q) {
    return (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
}
