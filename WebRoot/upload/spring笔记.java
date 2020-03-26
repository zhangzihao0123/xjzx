//1.合并时间区间
private static int[][] merge(int[][] inter) {
        if (inter.length <= 1) {
            return inter;
        }
        Arrays.sort(inter, Comparator.comparingInt(o->o[0]));
        List<int[]> list = new ArrayList<>();
        list.add(inter[0]);
        int last = 0;
        for (int i = 1; i < inter.length; i++) {
            int Start = list.get(last)[0];
            int End = list.get(last)[1];
            int nextstart = inter[i][0];
            int nextend = inter[i][1];
            if (nextstart > End) {
                list.add(new int[]{nextstart, nextend});
                last++;
            } else {
                if (nextend > End) {
                    list.set(last, new int[]{Start, nextend});
                }
            }
            if (Start == nextstart) {
                if (nextend > End) {
                    list.set(last, new int[]{nextstart, nextend});
                }
            }
        }
        return list.toArray(new int[0][]);
    }
//2.缩写校验
import java.util.*;
public class Main {
    public boolean valid(String s, String abbr) {
        char[] ss = s.toCharArray();
        char[] abbrs = abbr.toCharArray();
        int i = 0, j = 0;
        while (i < ss.length && j < abbrs.length) {
            if (Character.isDigit(abbrs[j]) && abbrs[j] != '0') {
                int times = 0;
                int cnt = 1;
                while (j < abbrs.length && Character.isDigit(abbrs[j])) {
                    times = cnt * times + abbrs[j] - '0';
                    cnt = 10 * cnt;
                    j++;
                }
                i = i + times;
            } else {
                if (ss[i] != abbrs[j])
                    return false;
                i++;
                j++;
            }
        }
        if (i == ss.length && j == abbrs.length)
            return true;
        return false;
    }
}
//3.没写出来