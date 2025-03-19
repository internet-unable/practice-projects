<?php

namespace App\Entity\Traits;

trait EncodingTrait
{
    public function encoding(string $st): string
    {
        $st = preg_replace('|\s+|', ' ', $st);
        $st = mb_strtolower($st, "UTF-8");
        $st = trim($st, "-");

        $st = strtr($st,
            array(
                "зг" => "zgh",
            )
        );

        $st = explode(" ", $st);

        $replace = array(
            "є" => "ye",
            "ї" => "yi",
            "й" => "y",
            "ю" => "yu",
            "я" => "ya",
        );

        foreach ($st AS $k => $string) {
            $charlist = preg_split('/(?<!^)(?!$)/u', $string);
            $charlist[0] = str_replace(array_keys($replace), array_values($replace), $charlist[0]);
            $st[$k] = implode("", $charlist);
        }

        $st = implode(" ", $st);

        $st = strtr($st,
            array(
                "а" => "a",
                "б" => "b",
                "в" => "v",
                "г" => "h",
                "ґ" => "g",
                "д" => "d",
                "е" => "e",
                "є" => "ie",
                "ж" => "zh",
                "з" => "z",
                "и" => "y",
                "і" => "i",
                "ї" => "i",
                "й" => "i",
                "к" => "k",
                "л" => "l",
                "м" => "m",
                "н" => "n",
                "о" => "o",
                "п" => "p",
                "р" => "r",
                "с" => "s",
                "т" => "t",
                "у" => "u",
                "ф" => "f",
                "х" => "kh",
                "ц" => "ts",
                "ч" => "ch",
                "ш" => "sh",
                "щ" => "shch",
                "ю" => "іu",
                "я" => "ia",
            )
        );

        $st = str_replace(' ', "-", $st);
        $st = str_replace('.', "-", $st);
        $st = str_replace('/', "-", $st);
        $st = preg_replace("/-{2,}/i", "-", $st);
        $st = trim($st, "-");

        $st = preg_replace("/[^0-9a-zA-Z_\-]/i", "", $st);

        $st = preg_replace("/-{2,}/i", "-", $st);

        return trim($st, "-");
    }
}
