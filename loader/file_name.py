import string

def parse_name(path)
    files = path.split('/')
    assert len(files) in (1,2),'Неверный путь к файлу "{0}"'.format(files)   
    
    file_dir = files[0] if len(files)>1 else ''   
    file_name = files[1] if len(files)>1 else files[0]   
    name = file_name.split('.')

    assert name[1] == 'xsl','Неверное расширение файла "{0}"'.format(name[1])       
    part = name[0].split('_')
    assert part[0].isdigit(),'Неверный идентификатор компании "{0}"'.format(part[0])   
    
    assert not part[1],'Неверное название компании'.format(part[2])   
    
    assert part[2] in ['U','R'],'Неверный код валюты'.format(part[3])   
    
    assert part[3].isdigit(),'Неверный начальный год "{0}"'.format(part[3])   
    assert int(part[3]) in range(1996,2017),'Неверный диапазон начального года "{0}"'.format(part[3])   
    
    assert part[4].isdigit(),'Неверный конечный год "{0}"'.format(part[4])   
    assert int(part[4]) in range(1996,2017),'Неверный диапазон конечного года "{0}"'.format(part[4])   
    assert int(part[3]) < int(part[4]),'Начальный год больше конечного "{0}"'.format(part[3],part[4])   
    
    return {'sector': file_dir
            'id': int(name[0])
            'name': name[1]
            'currency': name[2]
            'year_min': int(part[3])
            'year_max': int(part[4])
            }
