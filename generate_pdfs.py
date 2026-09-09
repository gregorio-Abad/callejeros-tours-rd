from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
import os, textwrap, math

out_dir = r"c:\Users\Administrator\Desktop\callejeros-tours-rd"
client_path = os.path.join(out_dir, "Callejeros_Tours_RD_Formulario_Cliente_Tour_Privado.pdf")
internal_path = os.path.join(out_dir, "Callejeros_Tours_RD_Formulario_Interno_Tour_Privado.pdf")

PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#08364A")
BLUE = colors.HexColor("#0B6B8F")
ORANGE = colors.HexColor("#FF8500")
LIGHT = colors.HexColor("#F3F7F9")
MID = colors.HexColor("#D8E3E8")
TEXT = colors.HexColor("#173042")
MUTED = colors.HexColor("#5F7482")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Brand", parent=styles["Title"], fontName="Helvetica-Bold",
                          fontSize=22, leading=26, textColor=NAVY, alignment=TA_CENTER, spaceAfter=5))
styles.add(ParagraphStyle(name="DocSub", parent=styles["Normal"], fontName="Helvetica",
                          fontSize=10.5, leading=14, textColor=MUTED, alignment=TA_CENTER, spaceAfter=16))
styles.add(ParagraphStyle(name="H1x", parent=styles["Heading1"], fontName="Helvetica-Bold",
                          fontSize=17, leading=21, textColor=NAVY, spaceBefore=5, spaceAfter=9))
styles.add(ParagraphStyle(name="H2x", parent=styles["Heading2"], fontName="Helvetica-Bold",
                          fontSize=12.5, leading=16, textColor=BLUE, spaceBefore=9, spaceAfter=6))
styles.add(ParagraphStyle(name="Bodyx", parent=styles["BodyText"], fontName="Helvetica",
                          fontSize=9.5, leading=14, textColor=TEXT, spaceAfter=6))
styles.add(ParagraphStyle(name="Smallx", parent=styles["BodyText"], fontName="Helvetica",
                          fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=4))
styles.add(ParagraphStyle(name="Callout", parent=styles["BodyText"], fontName="Helvetica-Bold",
                          fontSize=9.3, leading=13, textColor=NAVY, spaceAfter=4))

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(MID)
    canvas.setLineWidth(0.5)
    canvas.line(18*mm, 14*mm, PAGE_W-18*mm, 14*mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18*mm, 9*mm, "Callejeros Tours RD | callejerostrd@gmail.com | +1 829-808-1466")
    canvas.drawRightString(PAGE_W-18*mm, 9*mm, f"Pagina {doc.page}")
    canvas.restoreState()

def section(title):
    return [Spacer(1, 3), Paragraph(title, styles["H2x"])]

def blank_lines(rows=1, height=9*mm):
    data = [[""] for _ in range(rows)]
    t = Table(data, colWidths=[174*mm], rowHeights=[height]*rows)
    t.setStyle(TableStyle([
        ("BOX",(0,0),(-1,-1),0.6,MID),
        ("INNERGRID",(0,0),(-1,-1),0.4,MID),
        ("BACKGROUND",(0,0),(-1,-1),colors.white),
    ]))
    return t

def fields_table(fields, widths=(47*mm, 127*mm), row_height=10*mm):
    data=[]
    for label, value in fields:
        data.append([Paragraph(f"<b>{label}</b>", styles["Bodyx"]),
                     Paragraph(value if value else " ", styles["Bodyx"])])
    t=Table(data, colWidths=list(widths), rowHeights=[row_height]*len(data))
    t.setStyle(TableStyle([
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("BACKGROUND",(0,0),(0,-1),LIGHT),
        ("BOX",(0,0),(-1,-1),0.6,MID),
        ("INNERGRID",(0,0),(-1,-1),0.4,MID),
        ("LEFTPADDING",(0,0),(-1,-1),6),
        ("RIGHTPADDING",(0,0),(-1,-1),6),
    ]))
    return t

def checkbox_line(items):
    txt = "     ".join([f"[ ] {x}" for x in items])
    return Paragraph(txt, styles["Bodyx"])

policy_paras = [
    "<b>1. Solicitud y cotizacion.</b> La solicitud de un tour privado no constituye una reserva confirmada. Callejeros Tours RD revisara los destinos solicitados, cantidad de personas, fechas, duracion, punto de recogida, transporte y demas requerimientos antes de preparar una cotizacion personalizada.",
    "<b>2. Deposito para confirmar.</b> Una vez enviada y aceptada la cotizacion, se requiere un deposito equivalente al <b>20% del total presupuestado</b> para confirmar la reserva y comenzar las coordinaciones correspondientes. El 80% restante debera completarse conforme a las condiciones y fecha limite indicadas en la cotizacion.",
    "<b>3. Disponibilidad y cambios.</b> La disponibilidad de destinos, transporte, actividades y servicios esta sujeta a confirmacion. Cualquier modificacion solicitada despues de aprobar la cotizacion puede producir cambios en el precio, itinerario o disponibilidad.",
    "<b>4. Cancelaciones.</b> El deposito de reserva es generalmente no reembolsable debido a los gastos de planificacion y servicios que puedan ser coordinados con terceros. Las solicitudes de cancelacion o cambios seran evaluadas segun la anticipacion, los servicios contratados y las condiciones indicadas en la propuesta.",
    "<b>5. Cancelacion por Callejeros Tours RD.</b> Si Callejeros Tours RD debe cancelar un servicio confirmado por una causa atribuible a la empresa y no puede ofrecer una alternativa aceptable, se gestionara la devolucion correspondiente de los pagos recibidos por los servicios cancelados.",
    "<b>6. Verificacion de pagos.</b> El envio de un comprobante de pago no confirma automaticamente la reserva. Todo pago debe ser revisado y verificado por el equipo de Callejeros Tours RD.",
    "<b>7. Alcance de la propuesta.</b> El precio final, servicios incluidos, exclusiones, horarios, condiciones de pago y fecha limite del balance seran los establecidos en la cotizacion aprobada por el cliente."
]

def build_client():
    doc=SimpleDocTemplate(client_path, pagesize=A4, rightMargin=18*mm, leftMargin=18*mm,
                          topMargin=16*mm, bottomMargin=19*mm)
    story=[
        Paragraph("Callejeros Tours RD", styles["Brand"]),
        Paragraph("Solicitud de Tour Privado - Formulario para el Cliente", styles["DocSub"]),
        Paragraph("Disena tu experiencia en Republica Dominicana", styles["H1x"]),
        Paragraph("Completa este formulario con la mayor cantidad de detalles posible. La informacion nos permitira preparar un itinerario, evaluar la logistica y enviarte una cotizacion personalizada. <b>Enviar este formulario no confirma una reserva ni un precio.</b>", styles["Bodyx"]),
    ]
    story += section("1. Datos de contacto")
    story.append(fields_table([
        ("Nombre completo", ""),
        ("Pais de residencia", ""),
        ("WhatsApp + codigo de pais", ""),
        ("Correo electronico", ""),
        ("Idioma preferido", "[ ] Espanol     [ ] English     [ ] Otro: __________________"),
    ]))
    story += section("2. Informacion del viaje")
    story.append(fields_table([
        ("Fecha de llegada a RD", "____ / ____ / ______"),
        ("Fecha de salida de RD", "____ / ____ / ______"),
        ("Duracion aproximada", "________ dias"),
        ("Cantidad de personas", "________"),
    ]))
    story += section("3. Experiencia deseada")
    story.append(Paragraph("<b>Destinos o lugares que deseas visitar:</b>", styles["Bodyx"]))
    story.append(blank_lines(2, 9*mm))
    story.append(Spacer(1,5))
    story.append(Paragraph("<b>Tipo de experiencia:</b>", styles["Bodyx"]))
    story.append(checkbox_line(["Playas","Naturaleza y aventura","Cultura e historia","Gastronomia"]))
    story.append(checkbox_line(["Vida local","Actividades acuaticas","Familiar","Parejas","Grupos","Otro"]))
    story += section("4. Recogida")
    story.append(checkbox_line(["Hotel","Airbnb / alojamiento privado","Aeropuerto","Puerto / cruceros","Otro"]))
    story.append(Paragraph("<b>Nombre y/o direccion del lugar de recogida:</b>", styles["Bodyx"]))
    story.append(blank_lines(2, 8*mm))
    story += section("5. Informacion adicional")
    story.append(Paragraph("Ninos, adultos mayores, equipaje, celebracion especial, preferencias de transporte, actividades deseadas u otra informacion util para organizar el servicio:", styles["Smallx"]))
    story.append(blank_lines(3, 8*mm))
    story.append(PageBreak())
    story += [
        Paragraph("Callejeros Tours RD", styles["Brand"]),
        Paragraph("Politica de Tours Privados y Viajeros Internacionales", styles["DocSub"]),
    ]
    for p in policy_paras:
        story.append(Paragraph(p, styles["Bodyx"]))
    story.append(Spacer(1,5))
    callout = Table([[Paragraph(
        "IMPORTANTE: Despues de recibir y aceptar la cotizacion personalizada, se requiere un deposito del <b>20% del total cotizado</b> para confirmar el tour privado. El formulario por si solo no confirma la reserva.", styles["Callout"]
    )]], colWidths=[174*mm])
    callout.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#FFF4E8")),
        ("BOX",(0,0),(-1,-1),0.8,ORANGE),
        ("LEFTPADDING",(0,0),(-1,-1),9),("RIGHTPADDING",(0,0),(-1,-1),9),
        ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8),
    ]))
    story.append(callout)
    story += section("Aceptacion")
    story.append(Paragraph("[ ] He leido y acepto las politicas aplicables a los tours privados.", styles["Bodyx"]))
    story.append(Spacer(1,8))
    story.append(fields_table([
        ("Nombre del cliente", ""),
        ("Firma", ""),
        ("Fecha", "____ / ____ / ______"),
    ], row_height=11*mm))
    story.append(Spacer(1,8))
    story.append(Paragraph("Metodo preferido para enviar/continuar la solicitud:  [ ] WhatsApp     [ ] Correo electronico", styles["Bodyx"]))
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)

def build_internal():
    doc=SimpleDocTemplate(internal_path, pagesize=A4, rightMargin=16*mm, leftMargin=16*mm,
                          topMargin=15*mm, bottomMargin=19*mm)
    story=[
        Paragraph("Callejeros Tours RD", styles["Brand"]),
        Paragraph("Ficha Interna - Evaluacion, Presupuesto y Logistica de Tour Privado", styles["DocSub"]),
        Paragraph("Uso interno del equipo", styles["H1x"]),
        Paragraph("Esta ficha organiza la solicitud recibida y ayuda a convertirla en una propuesta comercial y operativa. La reserva solo se considera confirmada despues de aprobar la cotizacion, recibir el deposito requerido y verificar el pago.", styles["Bodyx"]),
    ]
    story += section("A. Identificacion de la solicitud")
    story.append(fields_table([
        ("ID / referencia", ""),
        ("Fecha de solicitud", ""),
        ("Responsable Callejeros", ""),
        ("Canal de entrada", "[ ] WhatsApp   [ ] Email   [ ] Web   [ ] Otro"),
        ("Estado", "[ ] Nueva   [ ] En evaluacion   [ ] Cotizada   [ ] Aceptada   [ ] Confirmada"),
    ], widths=(45*mm,133*mm)))
    story += section("B. Datos del cliente")
    story.append(fields_table([
        ("Nombre", ""),
        ("Pais", ""),
        ("WhatsApp", ""),
        ("Correo", ""),
        ("Idioma", ""),
        ("Personas", ""),
    ], widths=(45*mm,133*mm)))
    story += section("C. Viaje solicitado")
    story.append(fields_table([
        ("Llegada a RD", ""),
        ("Salida de RD", ""),
        ("Duracion", ""),
        ("Recogida", ""),
        ("Lugar / direccion", ""),
    ], widths=(45*mm,133*mm)))
    story.append(Spacer(1,5))
    story.append(Paragraph("<b>Destinos solicitados:</b>", styles["Bodyx"]))
    story.append(blank_lines(2, 8*mm))
    story.append(Spacer(1,5))
    story.append(Paragraph("<b>Preferencias / experiencia / observaciones:</b>", styles["Bodyx"]))
    story.append(blank_lines(2, 8*mm))
    story.append(PageBreak())
    story += [
        Paragraph("Callejeros Tours RD", styles["Brand"]),
        Paragraph("Planificacion de presupuesto y logistica", styles["DocSub"]),
    ]
    story += section("D. Diseno del itinerario")
    itin = Table([
        [Paragraph("<b>Dia / Fecha</b>", styles["Smallx"]), Paragraph("<b>Destino / Actividad</b>", styles["Smallx"]),
         Paragraph("<b>Horario</b>", styles["Smallx"]), Paragraph("<b>Proveedor / Nota</b>", styles["Smallx"])],
        ["","","",""],["","","",""],["","","",""],["","","",""],["","","",""],
    ], colWidths=[28*mm,67*mm,28*mm,55*mm], rowHeights=[8*mm]+[12*mm]*5)
    itin.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,0),LIGHT),("BOX",(0,0),(-1,-1),0.6,MID),
        ("INNERGRID",(0,0),(-1,-1),0.4,MID),("VALIGN",(0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),
    ]))
    story.append(itin)
    story += section("E. Costos y presupuesto")
    cost = Table([
        [Paragraph("<b>Concepto</b>", styles["Smallx"]), Paragraph("<b>Costo interno RD$ / US$</b>", styles["Smallx"]),
         Paragraph("<b>Precio cliente</b>", styles["Smallx"]), Paragraph("<b>Notas</b>", styles["Smallx"])],
        ["Transporte","","",""],["Entradas / actividades","","",""],["Guia / staff","","",""],
        ["Alimentos / bebidas","","",""],["Bote / servicio acuatico","","",""],["Otros","","",""],
        ["TOTAL PRESUPUESTO","","",""],
    ], colWidths=[47*mm,43*mm,38*mm,50*mm], rowHeights=[8*mm]+[10*mm]*7)
    cost.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,0),LIGHT),("BACKGROUND",(0,-1),(-1,-1),colors.HexColor("#FFF4E8")),
        ("BOX",(0,0),(-1,-1),0.6,MID),("INNERGRID",(0,0),(-1,-1),0.4,MID),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),
    ]))
    story.append(cost)
    story += section("F. Condiciones financieras")
    story.append(fields_table([
        ("Total cotizado", ""),
        ("Deposito 20%", ""),
        ("Balance 80%", ""),
        ("Fecha limite balance", ""),
        ("Metodo de pago", ""),
        ("Pago verificado por", ""),
    ], widths=(50*mm,128*mm), row_height=9*mm))
    story.append(Spacer(1,5))
    story.append(Paragraph("<b>Regla interna:</b> no marcar como CONFIRMADA una reserva por la sola recepcion de una captura o comprobante. El pago debe ser revisado y verificado por el equipo.", styles["Callout"]))
    story += section("G. Checklist antes de confirmar")
    story.append(checkbox_line(["Cotizacion enviada","Cliente acepto propuesta","Politica aceptada"]))
    story.append(checkbox_line(["Deposito 20% recibido","Pago verificado","Proveedores confirmados"]))
    story.append(checkbox_line(["Transporte confirmado","Itinerario final enviado","Contacto de seguimiento asignado"]))
    story += section("H. Seguimiento")
    story.append(fields_table([
        ("Proximo contacto", ""),
        ("Responsable", ""),
        ("Estado final", "[ ] Pendiente   [ ] Confirmada   [ ] Cancelada   [ ] Reprogramada"),
    ], widths=(50*mm,128*mm)))
    story.append(Spacer(1,7))
    story.append(Paragraph("<b>Notas internas:</b>", styles["Bodyx"]))
    story.append(blank_lines(3, 8*mm))
    story += section("Referencia de politica")
    for p in policy_paras[:6]:
        story.append(Paragraph(p, styles["Smallx"]))
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)

build_client()
build_internal()
print(client_path)
print(internal_path)
