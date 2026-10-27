import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.enum.section import WD_SECTION, WD_ORIENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn, nsdecls
from docx.oxml import parse_xml

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def set_table_borders(table, color="D1D5DB", sz="4", val="single"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:left w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:right w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:insideV w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
        </w:tblBorders>
    ''')
    tblPr.append(borders)

def create_document():
    doc = Document()

    # Set page orientation to LANDSCAPE
    section = doc.sections[0]
    section.orientation = WD_ORIENT.LANDSCAPE
    # Swap width and height for landscape
    new_width, new_height = section.page_height, section.page_width
    section.page_width = new_width
    section.page_height = new_height

    # Set page margins (0.6 inch / 1.5 cm)
    section.top_margin = Inches(0.6)
    section.bottom_margin = Inches(0.6)
    section.left_margin = Inches(0.6)
    section.right_margin = Inches(0.6)

    # Document Header / Title
    p_badge = doc.add_paragraph()
    r_badge = p_badge.add_run("FISCAL PULSE: NATIONAL BUDGET SIMULATOR  •  ОБУЧАЮЩИЕ МАТЕРИАЛЫ")
    r_badge.font.name = "Calibri"
    r_badge.font.size = Pt(8.5)
    r_badge.font.bold = True
    r_badge.font.color.rgb = RGBColor(224, 79, 62)  # Terracotta red

    p_title = doc.add_paragraph()
    r_title = p_title.add_run("Макроэкономические кейсы: Исторические решения и альтернативные исходы")
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(16)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(30, 30, 30)

    p_sub = doc.add_paragraph()
    r_sub = p_sub.add_run("Сравнительный анализ антикризисной политики 4 государств, реальных результатов и катастрофических сценариев при неверных решениях.")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(10)
    r_sub.font.color.rgb = RGBColor(100, 116, 139)
    p_sub.paragraph_format.space_after = Pt(12)

    # Table Data
    headers = [
        "Страна и год",
        "🚩 В чем был кризис",
        "🛠️ Что смелого они сделали",
        "🏆 Реальный результат",
        "💥 Что произошло бы при неверном решении"
    ]

    rows_data = [
        (
            "Сингапур\n1965",
            "Исключен из состава Малайзии. Полное отсутствие природных ресурсов (даже питьевая вода импортировалась). Безработица 14%, трущобы, этнические бунты.\n\nЗатем Британия объявила о выводе военных баз, что одномоментно стерло 20% всей экономики острова и 30 000 рабочих мест.",
            "Отказались от пошлин и защиты рынка. Сделали порт 100% беспошлинным.\n\nСовет экономического развития (EDB) предложил 10-летние налоговые каникулы технологическим гигантам США (Texas Instruments, HP). Осушили болота Джуронга под глубоководные причалы и обучали рыбаков токарному ремеслу.",
            "Совершил скачок из Третьего мира в Первый за одно поколение.\n\nКрупнейший перевалочный контейнерный порт мира. ВВП на душу населения превысил $85 000 (выше, чем в США). Мировой лидер в логистике и микроэлектронике.",
            "Если бы ввели пошлины «для защиты местных рабочих» и брали кредиты на продовольственные субсидии:\n\nМеждународные суда ушли бы в порты Малайзии, транснациональные технологические заводы никогда бы не появились, а Сингапур превратился бы в нищие трущобы на иностранной гуманитарной помощи."
        ),
        (
            "Норвегия\n1975",
            "В 1969 году открыты колоссальные запасы нефти в Северном море.\n\nОпасность «Голландской болезни»: когда миллиарды нефтедолларов текут в маленькую страну, крона резко дорожает. Традиционный экспорт (рыба, древесина, суда) становится непомерно дорогим для иностранцев, а фабрики банкротятся.",
            "Стерилизация капитала:\nЗапретили тратить нефтяные доходы внутри Норвегии! Деньги направили в зарубежный Государственный пенсионный фонд (Oljefondet), инвестирующий в 9 000 мировых компаний.\n\nПравило 3%: правительству законодательно запрещено брать из фонда больше его реального годового инвестдохода.",
            "Создан крупнейший суверенный фонд благосостояния в мире ($1.6 Триллиона, около $300 000 на каждого гражданина страны).\n\nСохранена диверсифицированная несырьевая промышленность, высокотехнологичное морское судостроение и зеленая энергетика.",
            "Если бы тратили всё сразу внутри страны (как Венесуэла или Британия в 70-х):\n\nВнутренняя инфляция достигла бы 30%, местная промышленность вымерла бы, а при обвале цен на нефть в 1986 году Норвегия осталась бы с пустой казной, закрытыми заводами, долгами и массовой безработицей."
        ),
        (
            "Греция\n2009",
            "Раскрыт реальный скрывавшийся дефицит бюджета в 15.7% ВВП. Госдолг взлетел до 170%.\n\n«Ловушка Еврозоны»: Греция использовала евро, поэтому не могла напечатать драхмы или девальвировать валюту для удешевления экспорта. Рынки облигаций полностью заблокировали кредитование.",
            "Осознали ловушку кривой Лаффера (после того как поднятие налога на бизнес до 42% вызвало бегство 60 000 компаний в Болгарию).\n\nСделали ставку на цифровизацию налогов: обязательные POS-терминалы, e-invoicing (IAPR). Рекапитализировали опорные банки и профинансировали ваучеры для IT-молодежи.",
            "Восстановлен первичный профицит госбюджета.\n\nСтрана полностью вышла из международных программ спасения, а суверенный кредитный рейтинг Греции был официально возвращен ведущими агентствами в надежную инвестиционную категорию.",
            "Если бы напечатали необеспеченную драхму (Grexit) или задрали налоги до 50%:\n\nНовая валюта обесценилась бы на 80% в первые же сутки. Сбережения граждан в банках сгорели бы, прекратился импорт бензина и лекарств, и страна скатилась бы в гиперинфляцию уровня Веймарской республики."
        ),
        (
            "Германия\n1948",
            "Послевоенная разруха. Рейхсмарка превратилась в макулатуру.\n\nАдминистративное регулирование цен и карточная система союзников привели к тотально пустым прилавкам. Население не хотело работать за фантики и торговало на черном рынке за американские сигареты, кофе и масло.",
            "«Воскресная ставка» Людвига Эрхарда (20 июня 1948 г.):\nВтайне от оккупационного командования Эрхард выступил по радио в воскресенье и одномоментно отменил все карточки и контроль цен!\n\nВвел твердую дойчмарку (обмен 10:1), поддержанную жестким центробанком, и направил средства плана Маршалла в станки и дуальное образование.",
            "В понедельник утром магазины по всей Германии заполнились колбасой, обувью и скобяными товарами.\n\nЧестные рыночные цены мгновенно вернули стимулы к труду и производству, дав старт легендарному «Немецкому экономическому чуду» (Wirtschaftswunder).",
            "Если бы сохранили контроль цен и печатали бумажные деньги дальше:\n\nБанды черного рынка контролировали бы всё снабжение, фермеры продолжали бы прятать зерно в амбарах, станки простаивали бы заржавевшими, а Германия осталась бы деиндустриализованной и нищей колонией на голодном пайке."
        )
    ]

    # Create Table: 5 columns, 5 rows (1 header + 4 cases)
    table = doc.add_table(rows=5, cols=5)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False

    # Widths in inches (Total ~9.8 inches fits well in 11-inch landscape - 1.2 inch margins = 9.8 inch)
    col_widths = [Inches(1.1), Inches(2.2), Inches(2.3), Inches(2.0), Inches(2.2)]

    # Format Header Row
    header_tr = table.rows[0]
    # Set header to repeat across pages if table breaks
    trPr = header_tr._tr.get_or_add_trPr()
    trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))

    for col_idx, text in enumerate(headers):
        cell = header_tr.cells[col_idx]
        cell.width = col_widths[col_idx]
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        set_cell_background(cell, "1E293B")  # Dark Slate / Charcoal
        set_cell_margins(cell, top=140, bottom=140, left=130, right=130)

        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(text)
        run.font.name = "Calibri"
        run.font.size = Pt(9.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(255, 255, 255)

    # Format Data Rows
    for row_idx, data in enumerate(rows_data):
        row = table.rows[row_idx + 1]
        # Alternating background colors
        bg_color = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"

        for col_idx, cell_text in enumerate(data):
            cell = row.cells[col_idx]
            cell.width = col_widths[col_idx]
            cell.vertical_alignment = WD_ALIGN_VERTICAL.TOP
            set_cell_background(cell, bg_color)
            set_cell_margins(cell, top=120, bottom=120, left=130, right=130)

            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.15

            # Formatting based on column
            run = p.add_run(cell_text)
            run.font.name = "Calibri"
            run.font.size = Pt(8.5)

            if col_idx == 0:
                run.font.bold = True
                run.font.size = Pt(10)
                run.font.color.rgb = RGBColor(30, 41, 59)
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            elif col_idx == 3:
                # Real outcome - green tint accent in text
                run.font.color.rgb = RGBColor(15, 118, 110)
            elif col_idx == 4:
                # Disaster avoided - subtle dark red tint
                run.font.color.rgb = RGBColor(153, 27, 27)
            else:
                run.font.color.rgb = RGBColor(51, 65, 85)

    # Apply clean borders
    set_table_borders(table, color="CBD5E1", sz="4", val="single")

    # Footer note
    doc.add_paragraph().paragraph_format.space_before = Pt(12)
    p_footer = doc.add_paragraph()
    r_f1 = p_footer.add_run("Ключевой макроэкономический вывод: ")
    r_f1.font.name = "Calibri"
    r_f1.font.bold = True
    r_f1.font.size = Pt(9)
    r_f1.font.color.rgb = RGBColor(30, 41, 59)

    r_f2 = p_footer.add_run(
        "В долгосрочной перспективе выигрывают не популистские раздачи денег и не механическое повышение налоговых ставок, "
        "а институциональные реформы: защита доверия к валюте, стимулирование инвестиций и борьба со структурными причинами кризиса."
    )
    r_f2.font.name = "Calibri"
    r_f2.font.size = Pt(9)
    r_f2.font.color.rgb = RGBColor(71, 85, 105)

    # Save to project folder
    output_path = r"C:\Users\user\.gemini\antigravity\scratch\fiscal-pulse\macroeconomic_cases_analysis.docx"
    doc.save(output_path)
    print(f"Document successfully created at: {output_path}")

if __name__ == "__main__":
    create_document()
