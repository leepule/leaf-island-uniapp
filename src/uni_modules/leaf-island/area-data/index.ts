import type { CascaderOption } from '../components/li-cascader/types';
import { cityList, countyList, provinceList } from './data';

export { cityList, countyList, provinceList } from './data';

/** 数据快照日期。 */
export const AREA_DATA_VERSION = '2026-10-08';

/**
 * 创建中国省、市、区县三级级联选项。
 * 每次调用都会创建新对象，调用方可以安全地筛选或修改返回结果。
 */
export function getChinaAreaOptions(): CascaderOption[] {
  const provinces = Object.entries(provinceList).map(([value, label]) => ({
    label,
    value,
    children: [] as CascaderOption[],
  }));
  const provinceMap = new Map(
    provinces.map((province) => [String(province.value).slice(0, 2), province]),
  );
  const cityMap = new Map<string, CascaderOption>();

  Object.entries(cityList).forEach(([value, label]) => {
    const city: CascaderOption = { label, value, children: [] };
    cityMap.set(value.slice(0, 4), city);
    provinceMap.get(value.slice(0, 2))?.children?.push(city);
  });

  Object.entries(countyList).forEach(([value, label]) => {
    const city = cityMap.get(value.slice(0, 4));
    city?.children?.push({ label, value });
  });

  return provinces;
}
