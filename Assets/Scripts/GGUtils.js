static function NumWithinParameters(num : float)
{
  return NumWithinParameters(num, 0, 360, 360);
}
static function NumWithinParameters(num : float, min : float, max : float)
{
  return NumWithinParameters(num, min, max, max - min);
}
static function NumWithinParameters(num : float, min : float, max : float, jump : float)
{
  if (num > max)
    while (num > max)
      num -= jump;
  else if (num < min)
    while (num < min)
      num += jump;
  return num;
}