"use client";

import { Card, CardContent } from "../../@/components/ui/card";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { Textarea } from "../../@/components/ui/textarea";
import { Button } from "../../@/components/ui/button";

const contactdetails = [
  {
    title: "Email",
    content: "contact@sanityesports.live",
  },
  {
    title: "Phone",
    content: "+1 (800) 123 XX21",
  },
  {
    title: "Support",
    content: "support@sanityesports.live",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-[70vh] grid md:grid-cols-2 gap-10 items-center justify-center pt-10 px-10 lg:px-[5%] xl:px-[15%] transition-all">
      <div className="flex flex-col items-start gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-medium tracking-tight transition-all">
            Contact us
          </h1>

          <h6 className="text-foreground/80 max-w-md tracking-tight">
            We are always looking for ways to improve our products and services.
            Contact us and let us know how we can help you.
          </h6>
        </div>

        <div className="flex flex-col gap-4">
          {contactdetails.map((item, idx) => (
            <div key={idx} className="">
              <h1 className="">{item.title}</h1>
              <p className="text-sm text-foreground/80">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center lg:p-10">
        <Card className="w-full p-5">
          <CardContent className="w-full md:py-5">
            <form className="flex flex-col gap-10">
              <div>
                <Label>Full Name</Label>

                <Input className="mt-2" />
              </div>

              <div>
                <Label>Email Address</Label>

                <Input className="mt-2" />
              </div>

              <div>
                <Label>Message</Label>

                <Textarea rows={3} className="mt-2" />
              </div>

              <Button
                // variant="outline"
                className="w-1/3"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
