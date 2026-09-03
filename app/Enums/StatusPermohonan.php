<?php

namespace App\Enums;

enum StatusPermohonan: string
{
    case Menunggu = 'menunggu';
    case Diproses = 'diproses';
    case Selesai = 'selesai';
}
