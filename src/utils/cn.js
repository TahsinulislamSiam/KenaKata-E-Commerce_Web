/** Tiny className joiner: cx('a', condition && 'b') -> "a b" */
export default function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
