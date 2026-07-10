import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, AreaChart, Area, ScatterChart, Scatter, ReferenceLine, Cell,
} from "recharts";
import {
  TrendingUp, TrendingDown, Wallet, Activity, Skull, Building2,
} from "lucide-react";

/* ============================================================
   1. DATA — bersumberkan DATABASE_PROJEK_TERNAKAN_AYAM_DAGING
      Sheet: "DASHBOARD STATUS PROJEK ver1" (67 kitaran, 2021-2025)
      Sheet: "PROFAIL PP" (sasaran & profil 3 PPK)
   ============================================================ */

const CYCLES = [{"ppk": "Kijal", "tahun": 2021, "pusingan": "P 1/2021", "pendapatan": 195276, "kos": 185223, "untungRugi": 10054, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 5.98, "fcr": 1.65, "outputKg": 42435, "bpi": 364, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2021, "pusingan": "P 2/2021", "pendapatan": 195430, "kos": 181116, "untungRugi": 14314, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 5.31, "fcr": 1.66, "outputKg": 42164, "bpi": 314, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Kijal", "tahun": 2021, "pusingan": "P 3/2021", "pendapatan": 205047, "kos": 192481, "untungRugi": 12566, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 7.46, "fcr": 1.64, "outputKg": 41010, "bpi": 326, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Kijal", "tahun": 2021, "pusingan": "P 4/2021", "pendapatan": 204761, "kos": 209555, "untungRugi": -4795, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 6.51, "fcr": 1.74, "outputKg": 41485, "bpi": 281, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2021, "pusingan": "P 5/2021", "pendapatan": 317233, "kos": 308008, "untungRugi": 9225, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 6.13, "fcr": 1.61, "outputKg": 68891, "bpi": 324, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2021, "pusingan": "P 6/2021", "pendapatan": 322000, "kos": 335947, "untungRugi": -13948, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 4.35, "fcr": 1.55, "outputKg": 77500, "bpi": 351, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2021, "pusingan": "P 1/2021", "pendapatan": 162651, "kos": 142155, "untungRugi": 20496, "pembekal": "Huat Lai Resourses Bhd", "kadarKematian": 3.27, "fcr": 1.58, "outputKg": 34242, "bpi": 371, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2021, "pusingan": "P 2/2021", "pendapatan": 131595, "kos": 134178, "untungRugi": -2583, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 2.65, "fcr": 1.59, "outputKg": 31915, "bpi": 344, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2021, "pusingan": "P 3/2021", "pendapatan": 144040, "kos": 133359, "untungRugi": 10681, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 4.12, "fcr": 1.65, "outputKg": 30324, "bpi": 315, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Kijal", "tahun": 2022, "pusingan": "P 1/2022", "pendapatan": 454200, "kos": 435150, "untungRugi": 19050, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 8.1, "fcr": 1.52, "outputKg": 66538, "bpi": 330, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Kijal", "tahun": 2022, "pusingan": "P 2/2022", "pendapatan": 504315, "kos": 485508, "untungRugi": 18807, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 6.54, "fcr": 1.61, "outputKg": 69518, "bpi": 301, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2022, "pusingan": "P 3/2022", "pendapatan": 522561, "kos": 460750, "untungRugi": 61811, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 5.06, "fcr": 1.71, "outputKg": 65017, "bpi": 280, "kesimpulan": "VERY GOOD"}, {"ppk": "Kijal", "tahun": 2022, "pusingan": "P 4/2022", "pendapatan": 442110, "kos": 426068, "untungRugi": 16042, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 6.78, "fcr": 1.75, "outputKg": 57946, "bpi": 221, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2022, "pusingan": "P 5/2022", "pendapatan": 341769, "kos": 396587, "untungRugi": -54819, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 6.13, "fcr": 1.61, "outputKg": 68891, "bpi": 324, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2022, "pusingan": "P 6/2022", "pendapatan": 468358, "kos": 407561, "untungRugi": 60797, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 4.35, "fcr": 1.55, "outputKg": 77500, "bpi": 351, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2022, "pusingan": "P 1/2022", "pendapatan": 291722, "kos": 283962, "untungRugi": 7760, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 4.98, "fcr": 1.71, "outputKg": 55304, "bpi": 286, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2022, "pusingan": "P 2/2022", "pendapatan": 319701, "kos": 298086, "untungRugi": 21615, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 5.34, "fcr": 1.61, "outputKg": 60865, "bpi": 323, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Dungun", "tahun": 2022, "pusingan": "P 3/2022", "pendapatan": 418666, "kos": 378282, "untungRugi": 40383, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 5.38, "fcr": 1.6, "outputKg": 66049, "bpi": 353, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2022, "pusingan": "P 4/2022", "pendapatan": 367792, "kos": 346214, "untungRugi": 21578, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 6.05, "fcr": 1.72, "outputKg": 59640, "bpi": 297, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Dungun", "tahun": 2022, "pusingan": "P 5/2022", "pendapatan": 447511, "kos": 403385, "untungRugi": 44127, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.88, "fcr": 1.56, "outputKg": 64219, "bpi": 355, "kesimpulan": "VERY GOOD"}, {"ppk": "Kijal", "tahun": 2023, "pusingan": "P 1/2023", "pendapatan": 329946, "kos": 320722, "untungRugi": 9225, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 5.8, "fcr": 1.57, "outputKg": 55985, "bpi": 387, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2023, "pusingan": "P 2/2023", "pendapatan": 435127, "kos": 432078, "untungRugi": 3049, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 6.33, "fcr": 1.64, "outputKg": 72130, "bpi": 345, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2023, "pusingan": "P 3/2023", "pendapatan": 418133, "kos": 406908, "untungRugi": 11226, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 6.9, "fcr": 1.65, "outputKg": 69525, "bpi": 344, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2023, "pusingan": "P 4/2023", "pendapatan": 348311, "kos": 361558, "untungRugi": -13247, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 7.61, "fcr": 1.75, "outputKg": 58663, "bpi": 290, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2023, "pusingan": "P 5/2023", "pendapatan": 420895, "kos": 382515, "untungRugi": 38379, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 6.13, "fcr": 1.61, "outputKg": 68891, "bpi": 370, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2023, "pusingan": "P 1/2023", "pendapatan": 423764, "kos": 346412, "untungRugi": 77353, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.41, "fcr": 1.45, "outputKg": 72438, "bpi": 428, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2023, "pusingan": "P 2/2023", "pendapatan": 564909, "kos": 500223, "untungRugi": 64685, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.53, "fcr": 1.49, "outputKg": 96690, "bpi": 370, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Dungun", "tahun": 2023, "pusingan": "P 3/2023", "pendapatan": 567675, "kos": 513128, "untungRugi": 54547, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.28, "fcr": 1.5, "outputKg": 96577, "bpi": 367, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2023, "pusingan": "P 4/2023", "pendapatan": 526309, "kos": 489085, "untungRugi": 37224, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.74, "fcr": 1.54, "outputKg": 89967, "bpi": 333, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2023, "pusingan": "P 5/2023", "pendapatan": 579811, "kos": 497169, "untungRugi": 82642, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 2.74, "fcr": 1.5, "outputKg": 95680, "bpi": 364, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Dungun", "tahun": 2023, "pusingan": "P 6/2023", "pendapatan": 615364, "kos": 504693, "untungRugi": 110671, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.64, "fcr": 1.42, "outputKg": 99293, "bpi": 399, "kesimpulan": "VERY GOOD"}, {"ppk": "Bukit Diman", "tahun": 2023, "pusingan": "P 1/2023", "pendapatan": 243596, "kos": 262306, "untungRugi": -18710, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.47, "fcr": 1.45, "outputKg": 31195, "bpi": 384, "kesimpulan": "VERY BAD"}, {"ppk": "Bukit Diman", "tahun": 2023, "pusingan": "P 2/2023", "pendapatan": 190675, "kos": 172720, "untungRugi": 17955, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.4, "fcr": 1.49, "outputKg": 32153, "bpi": 360, "kesimpulan": "VERY GOOD"}, {"ppk": "Bukit Diman", "tahun": 2023, "pusingan": "P 3/2023", "pendapatan": 196359, "kos": 166336, "untungRugi": 30023, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 2.47, "fcr": 1.5, "outputKg": 33115, "bpi": 368, "kesimpulan": "VERY GOOD"}, {"ppk": "Bukit Diman", "tahun": 2023, "pusingan": "P 4/2023", "pendapatan": 205946, "kos": 176815, "untungRugi": 29132, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.0, "fcr": 1.54, "outputKg": 35204, "bpi": 381, "kesimpulan": "VERY GOOD"}, {"ppk": "Kijal", "tahun": 2024, "pusingan": "P 1/2024", "pendapatan": 446501, "kos": 442766, "untungRugi": 3735, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 7.69, "fcr": 1.72, "outputKg": 75112, "bpi": 356, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2024, "pusingan": "P 2/2024", "pendapatan": 448473, "kos": 437963, "untungRugi": 10510, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 7.23, "fcr": 1.65, "outputKg": 75474, "bpi": 357, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2024, "pusingan": "P 3/2024", "pendapatan": 219284, "kos": 231535, "untungRugi": -12251, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 7.03, "fcr": 1.65, "outputKg": 36854, "bpi": 345, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2024, "pusingan": "P 4/2024", "pendapatan": 270374, "kos": 299993, "untungRugi": -29619, "pembekal": "Kee Sung Agriculture (M) Sdn Bhd", "kadarKematian": 13.14, "fcr": 1.85, "outputKg": 45849, "bpi": 295, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2024, "pusingan": "P 5/2024", "pendapatan": 382026, "kos": 410344, "untungRugi": -28318, "pembekal": "PTS Soultry Sdn Bhd", "kadarKematian": 5.09, "fcr": 1.7, "outputKg": 64846, "bpi": 363, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2024, "pusingan": "P 1/2024", "pendapatan": 497542, "kos": 493649, "untungRugi": 3893, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.99, "fcr": 1.59, "outputKg": 85050, "bpi": 360, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2024, "pusingan": "P 2/2024", "pendapatan": 551886, "kos": 480914, "untungRugi": 70972, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 2.5, "fcr": 1.41, "outputKg": 94339, "bpi": 436, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2024, "pusingan": "P 3/2024", "pendapatan": 533546, "kos": 489267, "untungRugi": 44279, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.39, "fcr": 1.54, "outputKg": 91204, "bpi": 405, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2024, "pusingan": "P 4/2024", "pendapatan": 535835, "kos": 518985, "untungRugi": 16850, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.61, "fcr": 1.63, "outputKg": 91590, "bpi": 367, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2024, "pusingan": "P 5/2024", "pendapatan": 524391, "kos": 488909, "untungRugi": 35482, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 5.4, "fcr": 1.49, "outputKg": 94485, "bpi": 414, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Dungun", "tahun": 2024, "pusingan": "P 6/2024", "pendapatan": 530679, "kos": 503479, "untungRugi": 27200, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.8, "fcr": 1.6, "outputKg": 95618, "bpi": 389, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Bukit Diman", "tahun": 2024, "pusingan": "P 1/2024", "pendapatan": 194628, "kos": 173718, "untungRugi": 20910, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.86, "fcr": 1.43, "outputKg": 32270, "bpi": 376, "kesimpulan": "VERY GOOD"}, {"ppk": "Bukit Diman", "tahun": 2024, "pusingan": "P 2/2024", "pendapatan": 193109, "kos": 188984, "untungRugi": 4125, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 1.71, "fcr": 1.36, "outputKg": 33010, "bpi": 405, "kesimpulan": "VERY BAD"}, {"ppk": "Bukit Diman", "tahun": 2024, "pusingan": "P 3/2024", "pendapatan": 194315, "kos": 170057, "untungRugi": 24258, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 1.93, "fcr": 1.36, "outputKg": 33216, "bpi": 407, "kesimpulan": "VERY GOOD"}, {"ppk": "Bukit Diman", "tahun": 2024, "pusingan": "P 4/2024", "pendapatan": 175027, "kos": 174754, "untungRugi": 274, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 2.8, "fcr": 1.52, "outputKg": 29919, "bpi": 328, "kesimpulan": "VERY BAD"}, {"ppk": "Bukit Diman", "tahun": 2024, "pusingan": "P 5/2024", "pendapatan": 182860, "kos": 172513, "untungRugi": 10348, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 5.64, "fcr": 1.49, "outputKg": 32948, "bpi": 369, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Bukit Diman", "tahun": 2024, "pusingan": "P 6/2024", "pendapatan": 174811, "kos": 177734, "untungRugi": -2923, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.21, "fcr": 1.46, "outputKg": 31498, "bpi": 360, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2025, "pusingan": "P 1/2025", "pendapatan": 479217, "kos": 433057, "untungRugi": 46160, "pembekal": "Goldform Corporation Sdn Bhd", "kadarKematian": 4.54, "fcr": 1.54, "outputKg": 81350, "bpi": 471, "kesimpulan": "VERY GOOD"}, {"ppk": "Kijal", "tahun": 2025, "pusingan": "P 2/2025", "pendapatan": 447976, "kos": 432301, "untungRugi": 15675, "pembekal": "Goldform Corporation Sdn Bhd", "kadarKematian": 5.68, "fcr": 1.6, "outputKg": 75847, "bpi": 415, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2025, "pusingan": "P 3/2025", "pendapatan": 430720, "kos": 447040, "untungRugi": -16321, "pembekal": "Goldform Corporation Sdn Bhd", "kadarKematian": 6.4, "fcr": 1.75, "outputKg": 73189, "bpi": 363, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2025, "pusingan": "P 4/2025", "pendapatan": 348802, "kos": 378615, "untungRugi": -29813, "pembekal": "Goldform Corporation Sdn Bhd", "kadarKematian": 7.32, "fcr": 1.75, "outputKg": 59140, "bpi": 286, "kesimpulan": "VERY BAD"}, {"ppk": "Kijal", "tahun": 2025, "pusingan": "P 5/2025", "pendapatan": 379457, "kos": 396264, "untungRugi": -16808, "pembekal": "Goldform Corporation Sdn Bhd", "kadarKematian": 10.31, "fcr": 1.69, "outputKg": 65315, "bpi": 311, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2025, "pusingan": "P 1/2025", "pendapatan": 480302, "kos": 462224, "untungRugi": 18078, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.23, "fcr": 1.58, "outputKg": 86541, "bpi": 304, "kesimpulan": "VERY BAD"}, {"ppk": "Dungun", "tahun": 2025, "pusingan": "P 2/2025", "pendapatan": 548567, "kos": 476390, "untungRugi": 72177, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.0, "fcr": 1.48, "outputKg": 97939, "bpi": 360, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2025, "pusingan": "P 3/2025", "pendapatan": 514557, "kos": 458506, "untungRugi": 56052, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.61, "fcr": 1.45, "outputKg": 92713, "bpi": 375, "kesimpulan": "VERY GOOD"}, {"ppk": "Dungun", "tahun": 2025, "pusingan": "P 4/2025", "pendapatan": 479179, "kos": 452581, "untungRugi": 26599, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.49, "fcr": 1.61, "outputKg": 90392, "bpi": 321, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Dungun", "tahun": 2025, "pusingan": "P 5/2025", "pendapatan": 452247, "kos": 472779, "untungRugi": -20532, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 6.19, "fcr": 1.69, "outputKg": 84263, "bpi": 272, "kesimpulan": "VERY BAD"}, {"ppk": "Bukit Diman", "tahun": 2025, "pusingan": "P 1/2025", "pendapatan": 181736, "kos": 169998, "untungRugi": 11737, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 3.79, "fcr": 1.45, "outputKg": 32745, "bpi": 408, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Bukit Diman", "tahun": 2025, "pusingan": "P 2/2025", "pendapatan": 179978, "kos": 165519, "untungRugi": 14459, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 5.41, "fcr": 1.41, "outputKg": 32428, "bpi": 415, "kesimpulan": "VERY GOOD"}, {"ppk": "Bukit Diman", "tahun": 2025, "pusingan": "P 3/2025", "pendapatan": 175645, "kos": 163075, "untungRugi": 12571, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.45, "fcr": 1.42, "outputKg": 31648, "bpi": 401, "kesimpulan": "JUST AVERAGE"}, {"ppk": "Bukit Diman", "tahun": 2025, "pusingan": "P 4/2025", "pendapatan": 176469, "kos": 169686, "untungRugi": 6783, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.87, "fcr": 1.4, "outputKg": 33613, "bpi": 434, "kesimpulan": "VERY BAD"}, {"ppk": "Bukit Diman", "tahun": 2025, "pusingan": "P 5/2025", "pendapatan": 179738, "kos": 162055, "untungRugi": 17683, "pembekal": "Chop Cheong Bee Sdn Bhd", "kadarKematian": 4.71, "fcr": 1.39, "outputKg": 34236, "bpi": 444, "kesimpulan": "VERY GOOD"}];

const TARGETS = {
  Kijal:        { 2021: 1400000, 2022: 2600000, 2023: 2000000, 2024: 2000000, 2025: 2000000 },
  Dungun:       { 2021: 400000,  2022: 1800000, 2023: 3000000, 2024: 3000000, 2025: 3200000 },
  "Bukit Diman":{ 2021: 0,       2022: 0,       2023: 800000,  2024: 800000,  2025: 950000  },
};

const PROFILE = {
  Kijal:        { daerah: "Kemaman",         pengurus: "Zakry bin Ismail",             kapasiti: 35000, lokasi: "Kg. Pengkalan Ranggon" },
  Dungun:       { daerah: "Dungun",          pengurus: "Nik Hairul Zamani bin Daud",   kapasiti: 45000, lokasi: "Kg. Besol" },
  "Bukit Diman":{ daerah: "Hulu Terengganu", pengurus: "Zawani bin Md. Zain",          kapasiti: 15000, lokasi: "Kg. Peladan" },
};

const PPK_LIST = ["Kijal", "Dungun", "Bukit Diman"];
const YEARS = [2021, 2022, 2023, 2024, 2025];

const COLOR = {
  navy: "#0F3D67",     // Biru Korporat - gelap (PPK Kijal)
  blue: "#2563EB",     // Biru Korporat - sederhana (PPK Dungun)
  sky:  "#38BDF8",     // Biru Korporat - cerah (PPK Bukit Diman)
  target: "#94A3B8",   // Neutral - garisan sasaran
  green: "#059669",    // Positif / Untung
  greenBg: "#ECFDF5",
  red: "#DC2626",      // Negatif / Rugi
  redBg: "#FEF2F2",
  amber: "#D97706",    // Sederhana / Amaran
  grid: "#E2E8F0",
  text: "#1E293B",
  subtext: "#64748B",
};

const PPK_COLOR = { Kijal: COLOR.navy, Dungun: COLOR.blue, "Bukit Diman": COLOR.sky };

/* ============================================================
   2. UTILITI FORMAT & PENGIRAAN
   ============================================================ */

const fmtRM = (n, compact = true) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "-";
  if (compact) {
    const abs = Math.abs(n);
    if (abs >= 1e6) return (n / 1e6).toFixed(2) + " juta";
    if (abs >= 1e3) return (n / 1e3).toFixed(0) + "k";
  }
  return n.toLocaleString("en-MY", { maximumFractionDigits: 0 });
};
const fmtRMFull = (n) => "RM " + Math.round(n).toLocaleString("en-MY");
const fmtPct = (n, dp = 1) => (n === null || n === undefined || Number.isNaN(n) ? "-" : n.toFixed(dp) + "%");

function classifyPPK(agg) {
  if (!agg || agg.n === 0) return { label: "TIADA DATA", tone: "neutral" };
  const { marginPct, avgBpi, avgMortality } = agg;
  if (marginPct >= 5 && avgBpi >= 350 && avgMortality <= 5.5) return { label: "SANGAT BAIK", tone: "good" };
  if (marginPct < 0 || avgMortality > 6.5 || avgBpi < 340) return { label: "PERLU PENAMBAHBAIKAN", tone: "bad" };
  return { label: "SEDERHANA", tone: "mid" };
}

function aggregatePPK(rows) {
  const n = rows.length;
  if (n === 0) return { n: 0 };
  const sum = (k) => rows.reduce((a, r) => a + r[k], 0);
  const totalRevenue = sum("pendapatan");
  const totalProfit = sum("untungRugi");
  const totalOutputKg = sum("outputKg");
  const avgFcr = rows.reduce((a, r) => a + r.fcr, 0) / n;
  const avgBpi = rows.reduce((a, r) => a + r.bpi, 0) / n;
  const avgMortality = rows.reduce((a, r) => a + r.kadarKematian, 0) / n;
  const marginPct = totalRevenue ? (totalProfit / totalRevenue) * 100 : 0;
  return { n, totalRevenue, totalProfit, totalOutputKg, avgFcr, avgBpi, avgMortality, marginPct };
}

/* ============================================================
   3. KOMPONEN KECIL
   ============================================================ */

function YearFilter({ value, onChange }) {
  const opts = ["ALL", ...YEARS.map(String)];
  return (
    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 flex-wrap">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={
            "px-3 py-1.5 text-xs font-semibold rounded-md transition-colors " +
            (value === o ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")
          }
        >
          {o === "ALL" ? "Semua Tahun" : o}
        </button>
      ))}
    </div>
  );
}

function KpiCard({ label, value, sub, deltaLabel, deltaTone, icon: Icon }) {
  const toneMap = {
    good: { text: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-100" },
    bad: { text: "text-red-600", bg: "bg-red-50", ring: "ring-red-100" },
    neutral: { text: "text-slate-500", bg: "bg-slate-100", ring: "ring-slate-100" },
  };
  const tone = toneMap[deltaTone] || toneMap.neutral;
  const DeltaIcon = deltaTone === "good" ? TrendingUp : deltaTone === "bad" ? TrendingDown : Activity;
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 shadow-sm min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-blue-800" />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 leading-tight truncate">{value}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{sub}</span>
        {deltaLabel && (
          <span className={"inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full " + tone.bg + " " + tone.text}>
            <DeltaIcon size={12} />
            {deltaLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function Badge({ tone, children }) {
  const map = {
    good: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    bad: "bg-red-50 text-red-700 ring-1 ring-red-200",
    mid: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    neutral: "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
  };
  return <span className={"px-2.5 py-1 rounded-full text-xs font-bold tracking-wide " + (map[tone] || map.neutral)}>{children}</span>;
}

function PanelHeader({ title, insight }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      {insight && <p className="text-xs text-slate-400 mt-0.5">{insight}</p>}
    </div>
  );
}

function CardShell({ children, className = "" }) {
  return <div className={"bg-white rounded-xl border border-slate-200 p-5 shadow-sm " + className}>{children}</div>;
}

function TargetTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const actual = payload.find((p) => p.dataKey === "actual");
  const target = payload.find((p) => p.dataKey === "target");
  const variance = actual && target && target.value ? ((actual.value - target.value) / target.value) * 100 : null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-xs">
      <div className="font-bold text-slate-700 mb-1">{label}</div>
      {actual && <div className="text-slate-500">Sebenar: <span className="font-semibold text-slate-800">{fmtRMFull(actual.value)}</span></div>}
      {target && <div className="text-slate-500">Sasaran: <span className="font-semibold text-slate-800">{fmtRMFull(target.value)}</span></div>}
      {variance !== null && (
        <div className={"font-bold mt-1 " + (variance >= 0 ? "text-emerald-600" : "text-red-600")}>
          {variance >= 0 ? "+" : ""}{variance.toFixed(1)}% berbanding sasaran
        </div>
      )}
    </div>
  );
}

function ProfitTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const total = payload.reduce((a, p) => a + (p.value || 0), 0);
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-xs">
      <div className="font-bold text-slate-700 mb-1">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-1.5 text-slate-500">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          {p.dataKey}: <span className="font-semibold text-slate-800">{fmtRMFull(p.value)}</span>
        </div>
      ))}
      <div className="font-bold text-slate-800 border-t border-slate-100 mt-1 pt-1">Jumlah: {fmtRMFull(total)}</div>
    </div>
  );
}

function ScatterTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-xs">
      <div className="font-bold text-slate-700">{d.ppk} • {d.pusingan}</div>
      <div className="text-slate-500">FCR: <span className="font-semibold text-slate-800">{d.fcr}</span></div>
      <div className="text-slate-500">BPI: <span className="font-semibold text-slate-800">{d.bpi}</span></div>
      <div className="text-slate-500">Kadar Kematian: <span className="font-semibold text-slate-800">{d.kadarKematian}%</span></div>
    </div>
  );
}

/* ============================================================
   4. PANEL: PRESTASI SEBENAR vs SASARAN (mengikut PPK)
   ============================================================ */

function RevenueVsTargetPanel({ selectedYear }) {
  const dataByPpk = useMemo(() => {
    const out = {};
    PPK_LIST.forEach((ppk) => {
      out[ppk] = YEARS.map((y) => {
        const actual = CYCLES.filter((c) => c.ppk === ppk && c.tahun === y).reduce((a, c) => a + c.pendapatan, 0);
        const target = TARGETS[ppk][y] || 0;
        return { tahun: String(y), actual, target };
      });
    });
    return out;
  }, []);

  return (
    <CardShell>
      <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
        <PanelHeader
          title="1 · Pendapatan Sebenar vs Sasaran Mengikut Tahun"
          insight="Bar biru = pendapatan sebenar · Garisan kelabu = sasaran tahunan khusus setiap PPK"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PPK_LIST.map((ppk) => {
          const rows = dataByPpk[ppk];
          const totalActual = rows.reduce((a, r) => a + r.actual, 0);
          const totalTarget = rows.reduce((a, r) => a + r.target, 0);
          const variance = totalTarget ? ((totalActual - totalTarget) / totalTarget) * 100 : null;
          return (
            <div key={ppk} className="min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700">PPK {ppk}</span>
                {variance !== null && (
                  <span className={"text-xs font-bold " + (variance >= 0 ? "text-emerald-600" : "text-red-600")}>
                    {variance >= 0 ? "+" : ""}{variance.toFixed(1)}%
                  </span>
                )}
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <ComposedChart data={rows} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke={COLOR.grid} vertical={false} />
                  <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: COLOR.subtext }} axisLine={{ stroke: COLOR.grid }} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: COLOR.subtext }} tickFormatter={(v) => fmtRM(v)} axisLine={false} tickLine={false} width={44} />
                  <Tooltip content={<TargetTooltip />} />
                  <Bar dataKey="actual" radius={[3, 3, 0, 0]} maxBarSize={28}>
                    {rows.map((r, i) => (
                      <Cell key={i} fill={PPK_COLOR[ppk]} opacity={selectedYear === "ALL" || selectedYear === r.tahun ? 1 : 0.28} />
                    ))}
                  </Bar>
                  <Line type="stepAfter" dataKey="target" stroke={COLOR.target} strokeWidth={2} strokeDasharray="4 3" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}

/* ============================================================
   5. PANEL: TREND KEUNTUNGAN (Area Chart, ditumpuk mengikut PPK)
   ============================================================ */

function ProfitTrendPanel({ selectedYear }) {
  const data = useMemo(() => {
    return YEARS.map((y) => {
      const row = { tahun: String(y) };
      PPK_LIST.forEach((ppk) => {
        row[ppk] = CYCLES.filter((c) => c.ppk === ppk && c.tahun === y).reduce((a, c) => a + c.untungRugi, 0);
      });
      return row;
    });
  }, []);

  return (
    <CardShell>
      <PanelHeader
        title="2 · Trend Keuntungan Merentas Tahun (2021-2025)"
        insight="Kawasan ditumpuk mengikut PPK · 67 kitaran pengeluaran digulung ke peringkat tahunan bagi kejelasan eksekutif"
      />
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 6, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid stroke={COLOR.grid} vertical={false} />
          <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: COLOR.subtext }} axisLine={{ stroke: COLOR.grid }} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: COLOR.subtext }} tickFormatter={(v) => fmtRM(v)} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ProfitTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => "PPK " + v} />
          <ReferenceLine y={0} stroke="#CBD5E1" />
          {selectedYear !== "ALL" && <ReferenceLine x={selectedYear} stroke={COLOR.amber} strokeDasharray="3 3" />}
          <Area type="monotone" dataKey="Kijal" stackId="1" stroke={PPK_COLOR.Kijal} fill={PPK_COLOR.Kijal} fillOpacity={0.85} />
          <Area type="monotone" dataKey="Dungun" stackId="1" stroke={PPK_COLOR.Dungun} fill={PPK_COLOR.Dungun} fillOpacity={0.75} />
          <Area type="monotone" dataKey="Bukit Diman" stackId="1" stroke={PPK_COLOR["Bukit Diman"]} fill={PPK_COLOR["Bukit Diman"]} fillOpacity={0.65} />
        </AreaChart>
      </ResponsiveContainer>
    </CardShell>
  );
}

/* ============================================================
   6. PANEL: BPI vs FCR (Scatter) & KADAR KEMATIAN mengikut PEMBEKAL
   ============================================================ */

function BpiFcrScatterPanel({ rows }) {
  const avgFcr = rows.length ? rows.reduce((a, r) => a + r.fcr, 0) / rows.length : 0;
  const avgBpi = rows.length ? rows.reduce((a, r) => a + r.bpi, 0) / rows.length : 0;

  return (
    <CardShell>
      <PanelHeader
        title="3 · Kecekapan Operasi — BPI vs FCR"
        insight="Kuadran kanan-bawah = FCR rendah & BPI tinggi (paling cekap) · Garisan putus = purata semasa"
      />
      {rows.length === 0 ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 6 }}>
            <CartesianGrid stroke={COLOR.grid} />
            <XAxis type="number" dataKey="fcr" name="FCR" domain={["auto", "auto"]} tick={{ fontSize: 10, fill: COLOR.subtext }} label={{ value: "FCR (rendah lebih baik)", position: "insideBottom", offset: -4, fontSize: 10, fill: COLOR.subtext }} />
            <YAxis type="number" dataKey="bpi" name="BPI" tick={{ fontSize: 10, fill: COLOR.subtext }} label={{ value: "BPI", angle: -90, position: "insideLeft", fontSize: 10, fill: COLOR.subtext }} />
            <ReferenceLine x={avgFcr} stroke={COLOR.amber} strokeDasharray="4 3" />
            <ReferenceLine y={avgBpi} stroke={COLOR.amber} strokeDasharray="4 3" />
            <Tooltip content={<ScatterTooltip />} cursor={{ strokeDasharray: "3 3" }} />
            <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => "PPK " + v} />
            {PPK_LIST.map((ppk) => (
              <Scatter key={ppk} name={ppk} data={rows.filter((r) => r.ppk === ppk)} fill={PPK_COLOR[ppk]} fillOpacity={0.8} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </CardShell>
  );
}

function MortalityBySupplierPanel({ rows }) {
  const data = useMemo(() => {
    const groups = {};
    rows.forEach((r) => {
      if (!groups[r.pembekal]) groups[r.pembekal] = [];
      groups[r.pembekal].push(r);
    });
    const overallAvg = rows.length ? rows.reduce((a, r) => a + r.kadarKematian, 0) / rows.length : 0;
    return Object.entries(groups)
      .map(([pembekal, list]) => ({
        pembekal: pembekal.replace(" Sdn Bhd", "").replace(" Bhd", ""),
        avgMortality: +(list.reduce((a, r) => a + r.kadarKematian, 0) / list.length).toFixed(2),
        avgBpi: Math.round(list.reduce((a, r) => a + r.bpi, 0) / list.length),
        n: list.length,
        overallAvg,
      }))
      .sort((a, b) => a.avgMortality - b.avgMortality);
  }, [rows]);

  return (
    <CardShell>
      <PanelHeader
        title="4 · Kadar Kematian Mengikut Pembekal DOC"
        insight="Hijau = di bawah purata keseluruhan · Merah = melebihi purata (perlu semakan kontrak)"
      />
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data} layout="vertical" margin={{ top: 4, right: 30, left: 8, bottom: 4 }}>
            <CartesianGrid stroke={COLOR.grid} horizontal={false} />
            <XAxis type="number" tickFormatter={(v) => v + "%"} tick={{ fontSize: 10, fill: COLOR.subtext }} axisLine={{ stroke: COLOR.grid }} tickLine={false} />
            <YAxis type="category" dataKey="pembekal" width={130} tick={{ fontSize: 10, fill: COLOR.text }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v, name) => (name === "avgMortality" ? [v + "%", "Purata Kadar Kematian"] : [v, name])}
              labelFormatter={(l) => l}
              contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: COLOR.grid }}
            />
            <ReferenceLine x={data[0] ? data[0].overallAvg : 0} stroke={COLOR.amber} strokeDasharray="4 3" />
            <Bar dataKey="avgMortality" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.avgMortality <= d.overallAvg ? COLOR.green : COLOR.red} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </CardShell>
  );
}

function EmptyState() {
  return (
    <div className="h-60 flex flex-col items-center justify-center text-slate-300 gap-2">
      <Building2 size={28} />
      <span className="text-xs font-medium text-slate-400">Tiada kitaran pengeluaran bagi tapisan ini</span>
    </div>
  );
}

/* ============================================================
   7. PANEL: PAPAN PENDAHULU (LEADERBOARD) PPK
   ============================================================ */

function LeaderboardPanel({ rows }) {
  const table = useMemo(() => {
    return PPK_LIST.map((ppk) => {
      const agg = aggregatePPK(rows.filter((r) => r.ppk === ppk));
      return { ppk, agg, cls: classifyPPK(agg) };
    }).sort((a, b) => (b.agg.totalProfit || -Infinity) - (a.agg.totalProfit || -Infinity));
  }, [rows]);

  return (
    <CardShell>
      <PanelHeader
        title="Papan Pendahulu Prestasi PPK"
        insight="Disusun mengikut jumlah keuntungan bersih tertinggi bagi tempoh tapisan semasa"
      />
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200">
              <th className="py-2 px-2 font-semibold">PPK</th>
              <th className="py-2 px-2 font-semibold text-right">Output (Kg)</th>
              <th className="py-2 px-2 font-semibold text-right">Purata FCR</th>
              <th className="py-2 px-2 font-semibold text-right">Purata BPI</th>
              <th className="py-2 px-2 font-semibold text-right">Jumlah Untung/Rugi</th>
              <th className="py-2 px-2 font-semibold text-center">Kesimpulan</th>
            </tr>
          </thead>
          <tbody>
            {table.map(({ ppk, agg, cls }) => (
              <tr key={ppk} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PPK_COLOR[ppk] }} />
                    <span className="font-bold text-slate-800">PPK {ppk}</span>
                  </div>
                  <div className="text-xs text-slate-400 pl-4">{PROFILE[ppk].daerah} · {agg.n || 0} kitaran</div>
                </td>
                <td className="py-3 px-2 text-right font-medium text-slate-700">{agg.n ? Math.round(agg.totalOutputKg).toLocaleString("en-MY") : "-"}</td>
                <td className="py-3 px-2 text-right font-medium text-slate-700">{agg.n ? agg.avgFcr.toFixed(2) : "-"}</td>
                <td className="py-3 px-2 text-right font-medium text-slate-700">{agg.n ? Math.round(agg.avgBpi) : "-"}</td>
                <td className={"py-3 px-2 text-right font-bold " + (agg.n ? (agg.totalProfit >= 0 ? "text-emerald-600" : "text-red-600") : "text-slate-300")}>
                  {agg.n ? fmtRMFull(agg.totalProfit) : "-"}
                </td>
                <td className="py-3 px-2 text-center"><Badge tone={cls.tone}>{cls.label}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardShell>
  );
}

/* ============================================================
   8. APP UTAMA
   ============================================================ */

export default function ExecutiveDashboard() {
  const [selectedYear, setSelectedYear] = useState("ALL");

  const filteredRows = useMemo(() => {
    if (selectedYear === "ALL") return CYCLES;
    return CYCLES.filter((c) => String(c.tahun) === selectedYear);
  }, [selectedYear]);

  const kpi = useMemo(() => {
    const agg = aggregatePPK(filteredRows);
    const years = selectedYear === "ALL" ? YEARS : [Number(selectedYear)];
    let totalTarget = 0;
    PPK_LIST.forEach((ppk) => years.forEach((y) => (totalTarget += TARGETS[ppk][y] || 0)));
    const revenueVariance = totalTarget ? ((agg.totalRevenue - totalTarget) / totalTarget) * 100 : null;
    return { ...agg, totalTarget, revenueVariance };
  }, [filteredRows, selectedYear]);

  return (
    <div className="w-full min-h-full bg-slate-50 p-4 md:p-6 font-sans" style={{ color: COLOR.text }}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
            <Building2 size={14} /> Pertubuhan Peladang Terengganu
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">Papan Pemuka Eksekutif — Projek Ternakan Ayam Pedaging</h1>
          <p className="text-xs text-slate-400 mt-1">PPK Kijal · PPK Dungun · PPK Bukit Diman &nbsp;|&nbsp; Tempoh 2021 – 2025</p>
        </div>
        <YearFilter value={selectedYear} onChange={setSelectedYear} />
      </div>

      {/* BARISAN ATAS — KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Pendapatan vs Sasaran"
          value={"RM " + fmtRM(kpi.totalRevenue || 0)}
          sub={"Sasaran: RM " + fmtRM(kpi.totalTarget)}
          deltaLabel={kpi.revenueVariance !== null ? (kpi.revenueVariance >= 0 ? "+" : "") + kpi.revenueVariance.toFixed(1) + "%" : null}
          deltaTone={kpi.revenueVariance === null ? "neutral" : kpi.revenueVariance >= 0 ? "good" : "bad"}
          icon={Wallet}
        />
        <KpiCard
          label="Keuntungan Bersih"
          value={"RM " + fmtRM(kpi.totalProfit || 0)}
          sub={"Purata Margin: " + fmtPct(kpi.marginPct)}
          deltaLabel={kpi.n ? (kpi.marginPct >= 0 ? "Untung" : "Rugi") : null}
          deltaTone={kpi.n ? (kpi.marginPct >= 0 ? "good" : "bad") : "neutral"}
          icon={TrendingUp}
        />
        <KpiCard
          label="Purata Indeks BPI"
          value={kpi.n ? Math.round(kpi.avgBpi) : "-"}
          sub="Broiler Performance Index"
          deltaLabel={kpi.n ? (kpi.avgBpi >= 350 ? "Cekap" : "Di bawah sasaran") : null}
          deltaTone={kpi.n ? (kpi.avgBpi >= 350 ? "good" : "bad") : "neutral"}
          icon={Activity}
        />
        <KpiCard
          label="Kadar Kematian Keseluruhan"
          value={kpi.n ? fmtPct(kpi.avgMortality) : "-"}
          sub={"Bilangan kitaran: " + kpi.n}
          deltaLabel={kpi.n ? (kpi.avgMortality <= 5.5 ? "Terkawal" : "Tinggi") : null}
          deltaTone={kpi.n ? (kpi.avgMortality <= 5.5 ? "good" : "bad") : "neutral"}
          icon={Skull}
        />
      </div>

      {/* BARISAN TENGAH 1 */}
      <div className="grid grid-cols-1 gap-5 mb-5">
        <RevenueVsTargetPanel selectedYear={selectedYear} />
        <ProfitTrendPanel selectedYear={selectedYear} />
      </div>

      {/* BARISAN TENGAH 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <BpiFcrScatterPanel rows={filteredRows} />
        <MortalityBySupplierPanel rows={filteredRows} />
      </div>

      {/* BARISAN BAWAH */}
      <LeaderboardPanel rows={filteredRows} />

      <p className="text-center text-xs text-slate-300 mt-6">
        Sumber data: DATABASE_PROJEK_TERNAKAN_AYAM_DAGING (67 kitaran pengeluaran, 2021-2025) · Dijana untuk semakan pengurusan tertinggi
      </p>
    </div>
  );
}
