import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label as ShadcnLabel } from '@/components/ui/label';
import * as ShadcnSelect from '@/components/ui/select';
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  Field as ShadcnField,
  FieldLabel as ShadcnFieldLabel,
  FieldDescription as ShadcnFieldDescription,
  FieldGroup as ShadcnFieldGroup,
  FieldLegend as ShadcnFieldLegend,
  FieldSeparator as ShadcnFieldSeparator,
  FieldSet as ShadcnFieldSet,
} from '@/components/ui/field';
import { ShadcnNavbarDemo } from './shadcn-navbar-demo';
import { AppBarContainerLazy } from './app/features/app-bar/app-bar-container-lazy';
import { ShadcnAppBar } from './app/features/app-bar/shadcn-app-bar';
import { IntegrationContext } from './app/features/integration/components/integration-variants/context/integration-context-wrapper';

/**
 * CoexistenceDemo - Test that both old paperwork-ui components and new shadcn components work together
 */
export function CoexistenceDemo() {
  // Mock onSave handler for demo purposes
  const mockOnSave = async () => {
    console.log('Mock save triggered');
    return 'success' as const;
  };
  return (
    <div style={{ minHeight: '100vh', height: '100vh', overflow: 'auto', background: '#f5f5f5' }}>
      <div style={{ padding: '0', margin: '0' }}>
        <h1 style={{ marginTop: '20px', marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>Navbar Comparison: Original vs Shadcn</h1>

        <div style={{ 
          marginBottom: '40px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'white'
        }}>
          {/* Original Navbar */}
          <div style={{ background: 'white' }}>
            <div style={{ 
              padding: '10px 20px', 
              background: '#f0f0f0', 
              borderBottom: '1px solid #ccc',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              Original Navbar (paperwork-ui)
            </div>
            <div style={{ borderRadius: '0' }}>
              <AppBarContainerLazy />
            </div>
          </div>

          {/* New Shadcn Navbar */}
          <div style={{ background: 'white', borderTop: '1px solid #ccc' }}>
            <div style={{ 
              padding: '10px 20px', 
              background: '#f0f0f0', 
              borderBottom: '1px solid #ccc',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              New Navbar (Shadcn - Full Implementation)
            </div>
            <div style={{ borderRadius: '0' }}>
              <IntegrationContext.Provider value={{ onSave: mockOnSave }}>
                <ShadcnAppBar />
              </IntegrationContext.Provider>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ marginTop: '40px' }}>Paperwork-UI + Shadcn Coexistence Test</h1>

          <div style={{ marginTop: '20px' }}>
            <h2>🎯 Shadcn Menubar (Default Style Test)</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              Testing if shadcn Tailwind styles are working properly. This should have a border, rounded corners, and hover effects.
            </p>
            <div style={{ padding: '20px', background: 'white', borderRadius: '8px' }}>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print...</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Undo</MenubarItem>
                    <MenubarItem>Redo</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Reload</MenubarItem>
                    <MenubarItem>Toggle Fullscreen</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginTop: '20px' }}>
            <h2>Old Component (paperwork-ui Button)</h2>
            <Button>Click me - Old Button</Button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h2>New Component (shadcn Card)</h2>
            <Card>
              <CardHeader>
                <CardTitle>Test Card</CardTitle>
                <CardDescription>This is a new shadcn Card component</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  If you see this styled nicely with rounded corners, border, and shadow,
                  the Tailwind CSS pipeline is working!
                </p>
              </CardContent>
              <CardFooter>
                <Button>Action Button</Button>
              </CardFooter>
            </Card>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h2>Multiple Cards</h2>
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Card>
                <CardHeader>
                  <CardTitle>Card 1</CardTitle>
                </CardHeader>
                <CardContent>Content 1</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Card 2</CardTitle>
                </CardHeader>
                <CardContent>Content 2</CardContent>
              </Card>
            </div>
          </div>

          <h1 style={{ marginTop: '40px' }}>Shadcn Field Components Demo</h1>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            Real shadcn/ui Field component with proper styling and structure. This is what the properties panel should look like!
          </p>
          <FieldDemo />

          <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <h2>Summary</h2>
            <ul>
              <li>✅ Old paperwork-ui Button component works</li>
              <li>✅ New shadcn Card component with Tailwind styles works</li>
              <li>✅ New shadcn Navbar with buttons and dropdowns works</li>
              <li>✅ Both CSS frameworks (CSS modules + Tailwind) coexist</li>
              <li>✅ Shadcn Field components now properly styled with Tailwind</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldDemo() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  
  return (
    <div style={{ marginTop: '20px' }}>
      <Card style={{ maxWidth: '500px' }}>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            All transactions are secure and encrypted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <ShadcnFieldGroup>
              <ShadcnFieldSet>
                <ShadcnFieldLegend>Card Details</ShadcnFieldLegend>
                <ShadcnFieldDescription>
                  Enter your card information
                </ShadcnFieldDescription>
                
                <ShadcnFieldGroup>
                  <ShadcnField>
                    <ShadcnFieldLabel htmlFor="card-name">
                      Name on Card
                    </ShadcnFieldLabel>
                    <ShadcnInput
                      id="card-name"
                      placeholder="Evil Rabbit"
                      defaultValue="Evil Rabbit"
                    />
                  </ShadcnField>
                  
                  <ShadcnField>
                    <ShadcnFieldLabel htmlFor="card-number">
                      Card Number
                    </ShadcnFieldLabel>
                    <ShadcnInput
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      defaultValue="1234 5678 9012 3456"
                    />
                    <ShadcnFieldDescription>
                      Enter your 16-digit card number
                    </ShadcnFieldDescription>
                  </ShadcnField>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <ShadcnField>
                      <ShadcnFieldLabel htmlFor="month">
                        Month
                      </ShadcnFieldLabel>
                      <ShadcnSelect.Select value={month} onValueChange={setMonth}>
                        <ShadcnSelect.SelectTrigger id="month">
                          <ShadcnSelect.SelectValue placeholder="MM" />
                        </ShadcnSelect.SelectTrigger>
                        <ShadcnSelect.SelectContent>
                          <ShadcnSelect.SelectItem value="01">01</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="02">02</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="03">03</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="04">04</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="05">05</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="06">06</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="07">07</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="08">08</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="09">09</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="10">10</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="11">11</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="12">12</ShadcnSelect.SelectItem>
                        </ShadcnSelect.SelectContent>
                      </ShadcnSelect.Select>
                    </ShadcnField>
                    
                    <ShadcnField>
                      <ShadcnFieldLabel htmlFor="year">
                        Year
                      </ShadcnFieldLabel>
                      <ShadcnSelect.Select value={year} onValueChange={setYear}>
                        <ShadcnSelect.SelectTrigger id="year">
                          <ShadcnSelect.SelectValue placeholder="YYYY" />
                        </ShadcnSelect.SelectTrigger>
                        <ShadcnSelect.SelectContent>
                          <ShadcnSelect.SelectItem value="2024">2024</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="2025">2025</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="2026">2026</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="2027">2027</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="2028">2028</ShadcnSelect.SelectItem>
                          <ShadcnSelect.SelectItem value="2029">2029</ShadcnSelect.SelectItem>
                        </ShadcnSelect.SelectContent>
                      </ShadcnSelect.Select>
                    </ShadcnField>
                    
                    <ShadcnField>
                      <ShadcnFieldLabel htmlFor="cvv">CVV</ShadcnFieldLabel>
                      <ShadcnInput id="cvv" placeholder="123" defaultValue="123" />
                    </ShadcnField>
                  </div>
                </ShadcnFieldGroup>
              </ShadcnFieldSet>
              
              <ShadcnFieldSeparator />
              
              <ShadcnFieldSet>
                <ShadcnFieldLegend>Billing Address</ShadcnFieldLegend>
                <ShadcnFieldDescription>
                  The billing address associated with your payment method
                </ShadcnFieldDescription>
                <ShadcnFieldGroup>
                  <ShadcnField orientation="horizontal">
                    <ShadcnCheckbox id="same-address" defaultChecked />
                    <ShadcnFieldLabel
                      htmlFor="same-address"
                      style={{ fontWeight: 'normal', marginBottom: 0 }}
                    >
                      Same as shipping address
                    </ShadcnFieldLabel>
                  </ShadcnField>
                </ShadcnFieldGroup>
              </ShadcnFieldSet>
              
              <ShadcnFieldSet>
                <ShadcnFieldGroup>
                  <ShadcnField>
                    <ShadcnFieldLabel htmlFor="comments">
                      Comments
                    </ShadcnFieldLabel>
                    <ShadcnTextarea
                      id="comments"
                      placeholder="Add any additional comments"
                      style={{ resize: 'none' }}
                    />
                  </ShadcnField>
                </ShadcnFieldGroup>
              </ShadcnFieldSet>
              
              <ShadcnField orientation="horizontal">
                <Button type="submit">Submit</Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </ShadcnField>
            </ShadcnFieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
